import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
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
import ViewReleaseDialog from './ViewReleaseDialog';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import theme from '../../theme';
import AddRecordButton from '../shared/AddRecordButton';
import ChangeViewTypeButton from '../shared/ChangeViewTypeButton';
import LoadingIndicator from '../shared/LoadingIndicator';
import { StyledDivider } from '../shared/styles';
import LoadingPopup from './LoadingPopup';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	collectionState,
	currentTabData,
	loadingProgressState,
	uiState,
	userInfoState,
} from '../../helpers/atoms';
import { TabContext, TabList } from '@mui/lab';
import { Box, Typography, Tab } from '@mui/material';
import { ReleaseListType } from '../../helpers/enum';
import CollectionTabPanel from './CollectionTabPanel';

export default () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { username: readOnlyUsername } = useParams();
	const [{ username }, setUserInfo] = useRecoilState(userInfoState);
	const [, setLoadingProgress] = useRecoilState(loadingProgressState);
	const setCollection = useSetRecoilState(collectionState);
	const [{ showLoadingPopup, readOnly, searchString, currentTab }, setUiState] =
		useRecoilState(uiState);
	const tabData = useRecoilValue(currentTabData);

	const load = async () => {
		let currentPage = 0,
			totalPages = 1;

		setIsLoading(true);
		setLoadingProgress(10);

		const parseResponse = (
			resp: UserCollection,
		): { items: UserCollectionItem[]; numOfItems: number } => {
			const progress =
				currentPage >= totalPages ? 100 : (resp.page / resp.pages) * 100;
			currentPage++;
			totalPages = resp.pages;
			setLoadingProgress(progress);
			return { items: resp.items, numOfItems: resp.numOfItems };
		};

		if (readOnly) {
			const releases = [] as UserCollectionItem[];

			while (currentPage < totalPages) {
				const { items } = await getPublicUserCollection(
					readOnlyUsername as string,
					currentPage + 1,
				).then(parseResponse);
				releases.push(...items);
				setCollection((current) => ({
					...current,
					releases,
				}));
				setIsLoading(false);
			}
		} else {
			const wantList = await getUserWantList(username).then(
				(resp) => resp.items,
			);
			const value = await getUserCollectionValue(username);

			setCollection((current) => ({
				...current,
				wantList,
				value,
			}));

			while (currentPage < totalPages) {
				const { items, numOfItems } = await getUserCollection(
					username,
					currentPage + 1,
				).then(parseResponse);

				setIsLoading(false);
				setCollection((current) => ({
					...current,
					numOfItems,
					releases: current.releases.concat(items),
				}));
			}
		}
	};

	useEffect(() => {
		const data = tabData;
		let filteredData = data;
		if (searchString.length > 0) {
			filteredData = data.filter(
				(row) =>
					removeDiacritics(row.artist).includes(
						removeDiacritics(searchString),
					) ||
					removeDiacritics(row.title).includes(removeDiacritics(searchString)),
			);
		}
		setUiState((prev) => ({ ...prev, filteredData }));
	}, [searchString, tabData]);

	useEffect(() => {
		if (!readOnly && username.length === 0) {
			getUserInfo().then((userInfo) => setUserInfo(userInfo));
		}

		if (username.length > 0) {
			(async () => {
				await load();
			})();
		}
	}, [username, readOnly]);

	const onChange = (
		_event: React.SyntheticEvent,
		releaseListType: ReleaseListType,
	) => {
		setUiState((prev) => ({
			...prev,
			currentTab: releaseListType,
			searchString: '',
		}));
	};

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
					<SearchBar style={{ marginTop: isMobile ? 70 : 'inherit' }}>
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
									onChange={onChange}
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
						<CollectionTabPanel type={ReleaseListType.Collection} />
						{!readOnly && (
							<CollectionTabPanel type={ReleaseListType.WantList} />
						)}
					</TabContext>
				)}
				<ViewReleaseDialog />
				{showLoadingPopup && <LoadingPopup />}
			</Container>
		</div>
	);
};
