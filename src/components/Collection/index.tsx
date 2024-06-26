import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { AppReducerActions, ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container } from './styles';
import Table from './Table';
import { UserCollectionItem } from '../../helpers/types';
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
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MobileGrid from './MobileGrid';
import Fab from '../shared/FloatingActionButton';
import theme from '../../theme';
import AddRecordButton from '../shared/AddRecordButton';
import WantListSwitch from '../shared/WantListSwitch';
import ChangeViewTypeButton from '../shared/ChangeViewTypeButton';
import WantListButton from '../shared/WantListButton';
import LoadingIndicator from '../shared/LoadingIndicator';
import { StyledDivider } from '../shared/styles';

export default ({ readOnly = false }: { readOnly?: boolean }) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [data, setData] = useState<UserCollectionItem[]>([]);
	const [filteredData, setFilteredData] = useState<UserCollectionItem[]>([]);
	const [informationDialog, setInformationDialog] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { username: readOnlyUsername } = useParams();

	const {
		user: { username },
		collection,
		ui: { viewType, wantList: showWantList },
	} = useAppState();
	const { value, numberOfItems, releases, wantList } = collection;
	const dispatch = useAppDispatch();

	const toggleInformationDialog = () =>
		setInformationDialog(!informationDialog);

	const showInformation = (item: UserCollectionItem) => {
		dispatch({ type: AppReducerActions.SetCurrentRelease, release: item });
		toggleInformationDialog();
	};

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
		if (showWantList) {
			setData(wantList);
		} else {
			setData(releases);
		}
	}, [releases, wantList]);

	useEffect(() => {
		let value = '',
			numberOfItems = 0,
			releases = [] as UserCollectionItem[];

		if (!readOnly) {
			if (username.length === 0) {
				getUserInfo().then((userInfo) =>
					dispatch({ type: AppReducerActions.UpdateUserInfo, user: userInfo }),
				);
			} else {
				if (collection.releases.length === 0) {
					(async () => {
						setIsLoading(true);
						await getUserCollection(username).then((collection) => {
							releases = collection.items;
							numberOfItems = collection.items.length;
						});
						await getUserCollectionValue(username).then(
							(collectionValue) => (value = collectionValue),
						);
						dispatch({
							type: AppReducerActions.UpdateCollectionInfo,
							collection: { value, numberOfItems, releases, wantList: [] },
						});
						setIsLoading(false);
					})();
				}
			}
		} else {
			if (collection.releases.length === 0) {
				(async () => {
					setIsLoading(true);
					await getPublicUserCollection(readOnlyUsername as string).then(
						(collection) => {
							releases = collection.items;
							numberOfItems = collection.items.length;
						},
					);
					dispatch({
						type: AppReducerActions.UpdateCollectionInfo,
						collection: { value: '', numberOfItems, releases, wantList: [] },
					});
					setIsLoading(false);
				})();
			}
		}
	}, [username, readOnlyUsername, readOnly]);

	useEffect(() => {
		if (showWantList) {
			if (wantList.length === 0) {
				(async () => {
					setIsLoading(true);
					await getUserWantList(username)
						.then((items) => {
							dispatch({
								type: AppReducerActions.UpdateCollectionInfo,
								collection: { ...collection, wantList: items },
							});
						})
						.finally(() => setIsLoading(false));
				})();
			} else {
				setData(wantList);
			}
		} else {
			setData(releases);
		}
	}, [showWantList]);

	const DataViewer = () => {
		if (data.length !== 0) {
			if (isMobile) {
				return (
					<>
						<MobileGrid data={filteredData} />
						{!showWantList && !readOnly && <Fab />}
					</>
				);
			}
			return (
				<div style={{ flexGrow: 1 }}>
					{viewType === ViewType.TABLE && (
						<Table data={filteredData} onItemClick={showInformation} />
					)}
					{viewType === ViewType.GRID && (
						<Grid data={filteredData} onItemClick={showInformation} />
					)}
				</div>
			);
		}
		return <Typography variant="h6">There are no releases.</Typography>;
	};

	return (
		<div>
			<Toolbar
				value={value}
				numOfItems={numberOfItems.toString()}
				readOnly={readOnly}
				username={readOnlyUsername}
			/>
			<Container isMobile={isMobile}>
				<div
					style={{
						width: '100%',
						zIndex: 1,
						backgroundColor: theme.palette.background.default,
						position: 'sticky',
						top: !isMobile ? 60 : 0,
					}}
				>
					<SearchBar
						value={searchValue}
						onChange={(value) => setSearchValue(value)}
						onClear={() => setSearchValue('')}
						style={{ marginTop: isMobile ? 70 : 'inherit' }}
					>
						<div style={{ display: 'flex' }}>
							{!readOnly && !isMobile && <WantListSwitch />}
							{!isMobile && <ChangeViewTypeButton />}
							{!readOnly && !isMobile && <AddRecordButton />}
							{!readOnly && isMobile && <WantListButton />}
						</div>
					</SearchBar>
					<StyledDivider />
				</div>
				{isLoading ? <LoadingIndicator /> : <DataViewer />}
				<ViewReleaseDialog
					open={informationDialog}
					onClose={toggleInformationDialog}
					readOnly={readOnly}
				/>
			</Container>
		</div>
	);
};
