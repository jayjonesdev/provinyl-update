import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import {
	AppReducerActions,
	ReleaseListType,
	ViewType,
} from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container } from './styles';
import Table from './Table';
import { UserCollection, UserCollectionItem } from '../../helpers/types';
import { removeDiacritics } from '../../helpers';
import {
	getPublicUserCollection,
	getUserCollection,
	getUserCollectionValue,
	getUserInfo,
	getUserWantList,
} from '../../api';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import Grid from './Grid';
import ViewReleaseDialog from './ViewReleaseDialog';
import { Box, Tab, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MobileGrid from './MobileGrid';
import Fab from '../shared/FloatingActionButton';
import theme from '../../theme';
import AddRecordButton from '../shared/AddRecordButton';
import ChangeViewTypeButton from '../shared/ChangeViewTypeButton';
import LoadingIndicator from '../shared/LoadingIndicator';
import { StyledDivider } from '../shared/styles';
import LoadingPopup from './LoadingPopup';
import { useRecoilState } from 'recoil';
import {
	collectionState,
	loadingProgressState,
	uiState,
} from '../../helpers/atoms';
import { TabContext, TabList } from '@mui/lab';
import CollectionTabPanel from './CollectionTabPanel';

// TODO: Check path to determine if readOnly or not
export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [data, setData] = useState<UserCollectionItem[]>([]);
	const [filteredData, setFilteredData] = useState<UserCollectionItem[]>([]);
	const [informationDialog, setInformationDialog] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { username: readOnlyUsername } = useParams();
	const {
		user: { username },
		ui: { wantList: showWantList },
	} = useAppState();
	const dispatch = useAppDispatch();
	const [, setLoadingProgress] = useRecoilState(loadingProgressState);
	const [collection, setCollection] = useRecoilState(collectionState);
	const { releases, wantList } = collection;
	const [ui, setUiState] = useRecoilState(uiState);
	const { currentTab, showLoadingPopup, readOnly } = ui;

	const changeTab = (
		_event: React.SyntheticEvent,
		releaseListType: ReleaseListType,
	) => {
		setUiState({ ...ui, currentTab: releaseListType });
	};
	const toggleInformationDialog = () =>
		setInformationDialog(!informationDialog);

	const showInformation = (item: UserCollectionItem) => {
		dispatch({ type: AppReducerActions.SetCurrentRelease, release: item });
		toggleInformationDialog();
	};

	const load = async () => {
		let currentPage = 0,
			totalPages = 1,
			userReleases = [] as UserCollectionItem[];
		// userWantList = [] as UserCollectionItem[];

		setIsLoading(true);
		setLoadingProgress(10);

		const parseResponse = (resp: UserCollection) => {
			const progress =
				currentPage >= totalPages ? 100 : (resp.page / resp.pages) * 100;
			currentPage++;
			totalPages = resp.pages;
			setLoadingProgress(progress);
			return resp.items;
		};

		if (readOnly) {
			while (currentPage < totalPages) {
				const items = await getPublicUserCollection(
					readOnlyUsername as string,
					currentPage + 1,
				).then(parseResponse);
				userReleases = userReleases.concat(items);
				setIsLoading(false);
				setCollection({
					...collection,
					releases: userReleases,
				});
			}
		} else {
			while (currentPage < totalPages) {
				const items = await getUserCollection(username, currentPage + 1).then(
					parseResponse,
				);
				userReleases = userReleases.concat(items);
				setIsLoading(false);
				setCollection({
					...collection,
					releases: userReleases,
				});
			}
		}
	};

	// const loadCollection = async () => {
	// 	let currentPage = 0,
	// 		totalPages = 1,
	// 		userItems = [] as UserCollectionItem[];

	// 	const parseCollectionResponse = (resp: UserCollection) => {
	// 		userItems = userItems.concat(resp.items);
	// 		setCollection({
	// 			...collection,
	// 			releases: !showWantList ? userItems : releases,
	// 			wantList: showWantList ? userItems : wantList,
	// 		});
	// 		setIsLoading(false);
	// 		const progress =
	// 			currentPage >= totalPages ? 100 : (resp.page / resp.pages) * 100;
	// 		currentPage++;
	// 		totalPages = resp.pages;
	// 		setLoadingProgress(progress);
	// 	};

	// 	if (showWantList && wantList.length === 0) {
	// 		setLoadingProgress(10);
	// 		while (currentPage < totalPages) {
	// 			await getUserWantList(username, currentPage + 1).then(
	// 				parseCollectionResponse,
	// 			);
	// 		}
	// 	} else if (!showWantList && collection.releases.length === 0) {
	// 		setLoadingProgress(10);
	// 		if (readOnly) {
	// 			while (currentPage < totalPages) {
	// 				await getPublicUserCollection(
	// 					readOnlyUsername as string,
	// 					currentPage + 1,
	// 				).then(parseCollectionResponse);
	// 			}
	// 		} else {
	// 			setLoadingProgress(10);
	// 			while (currentPage < totalPages) {
	// 				await getUserCollection(username, currentPage + 1).then(
	// 					parseCollectionResponse,
	// 				);
	// 			}
	// 		}
	// 	}
	// };

	useEffect(() => {
		let filteredData = data;
		if (searchValue.length > 0) {
			filteredData = data.filter(
				(row) =>
					removeDiacritics(row.artist).includes(
						removeDiacritics(searchValue),
					) ||
					removeDiacritics(row.title).includes(removeDiacritics(searchValue)),
			);
		}
		setFilteredData(filteredData);
	}, [searchValue, data]);

	useEffect(() => {
		if (!readOnly && username.length === 0) {
			getUserInfo().then((userInfo) =>
				dispatch({ type: AppReducerActions.UpdateUserInfo, user: userInfo }),
			);
		}

		if (username.length > 0) {
			(async () => {
				await load();
			})();
		}
	}, [username, readOnly, showWantList]);

	return (
		<div>
			<Toolbar
				value={''}
				numOfItems={releases.length.toString()}
				readOnly={readOnly}
				username={readOnlyUsername}
			/>
			<Container isMobile={isMobile}>
				<div
					style={{
						width: '100%',
						zIndex: 1,
						backgroundColor: theme.palette.background.default,
						// position: 'sticky',
						// top: !isMobile ? 60 : 0,
					}}
				>
					<SearchBar
						value={searchValue}
						onChange={(value) => setSearchValue(value)}
						onClear={() => setSearchValue('')}
						style={{ marginTop: isMobile ? 70 : 'inherit' }}
					>
						<div style={{ display: 'flex' }}>
							{!isMobile && <ChangeViewTypeButton />}
							{!readOnly && !isMobile && <AddRecordButton />}
						</div>
					</SearchBar>
					<StyledDivider />
				</div>
				{isLoading ? (
					<LoadingIndicator />
				) : (
					<TabContext value={currentTab}>
						{!readOnly && (
							<Box
								sx={{
									borderBottom: 1,
									borderColor: 'divider',
									marginBottom: isMobile ? 3 : 0,
								}}
							>
								<TabList
									onChange={changeTab}
									aria-label="Your Collection and Want List"
								>
									<Tab label="Collection" value={ReleaseListType.Collection} />
									<Tab label="WantList" value={ReleaseListType.WantList} />
								</TabList>
							</Box>
						)}
						<CollectionTabPanel
							type={ReleaseListType.Collection}
							onItemClick={showInformation}
						/>
						{!readOnly && (
							<CollectionTabPanel
								type={ReleaseListType.WantList}
								onItemClick={showInformation}
							/>
						)}
					</TabContext>
				)}

				<ViewReleaseDialog
					open={informationDialog}
					onClose={toggleInformationDialog}
					readOnly={readOnly}
				/>
				{showLoadingPopup && <LoadingPopup />}
			</Container>
		</div>
	);
};
