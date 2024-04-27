import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { AppReducerActions, ReleaseListType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container } from './styles';
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
import ViewReleaseDialog from './ViewReleaseDialog';
import { Box, Tab, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
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

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
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
		setSearchValue('');
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
			numOfItems = 0,
			value = '',
			userReleases = [] as UserCollectionItem[];

		setIsLoading(true);
		setLoadingProgress(10);

		const parseResponse = (resp: UserCollection) => {
			const progress =
				currentPage >= totalPages ? 100 : (resp.page / resp.pages) * 100;
			currentPage++;
			totalPages = resp.pages;
			numOfItems = resp.numOfItems;
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
			await getUserCollectionValue(username).then((data) => (value = data));

			while (currentPage < totalPages) {
				const items = await getUserCollection(username, currentPage + 1).then(
					parseResponse,
				);
				const wantList = await getUserWantList(username).then(
					(resp) => resp.items,
				);
				userReleases = userReleases.concat(items);
				setIsLoading(false);
				setCollection({
					...collection,
					numOfItems,
					value,
					releases: userReleases,
					wantList,
				});
			}
		}
	};

	useEffect(() => {
		const data =
			currentTab === ReleaseListType.Collection ? releases : wantList;
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
		setUiState({ ...ui, filteredData });
	}, [searchValue, releases, wantList]);

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
			<Toolbar readOnly={readOnly} username={readOnlyUsername} />
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
									marginBottom: isMobile ? 3 : 0,
								}}
							>
								<TabList
									onChange={changeTab}
									aria-label="Your Collection and Want List"
								>
									<Tab
										label={
											<Typography variant="body1" fontWeight={500}>
												Collection
											</Typography>
										}
										value={ReleaseListType.Collection}
									/>
									<Tab
										label={
											<Typography variant="body1" fontWeight={500}>
												Want List
											</Typography>
										}
										value={ReleaseListType.WantList}
									/>
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
