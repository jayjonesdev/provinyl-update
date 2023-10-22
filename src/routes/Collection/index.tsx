import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { AppReducerActions, ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container, SpinnerContainer, StyledDivider } from './styles';
import Table from './Table';
import { UserCollectionItem } from '../../helpers/types';
import { removeDiacritics } from '../../helpers';
import {
	getUserCollection,
	getUserCollectionValue,
	getUserInfo,
	getUserWantList,
} from '../../api';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import Grid from './Grid';
import ViewReleaseDialog from './ViewReleaseDialog';
import { Alert, CircularProgress, Fade, Snackbar } from '@mui/material';

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [data, setData] = useState<UserCollectionItem[]>([]);
	const [filteredData, setFilteredData] = useState<UserCollectionItem[]>([]);
	const [informationDialog, setInformationDialog] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		user: { username },
		collection,
		ui: { viewType, wantList: showWantList },
		snackbar,
	} = useAppState();
	const { value, numberOfItems, releases, wantList } = collection;
	const {
		open: showSnackbar,
		message: snackbarMessage,
		severity: snackbarSeverity,
	} = snackbar;
	const dispatch = useAppDispatch();

	const toggleInformationDialog = () =>
		setInformationDialog(!informationDialog);

	const showInformation = (item: UserCollectionItem) => {
		dispatch({ type: AppReducerActions.SetCurrentRelease, release: item });
		toggleInformationDialog();
	};

	const closeSnackbar = () =>
		dispatch({
			type: AppReducerActions.SetSnackbar,
			snackbar: { ...snackbar, open: false },
		});

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
		setIsLoading(true);
		if (username.length === 0) {
			getUserInfo().then((userInfo) =>
				dispatch({ type: AppReducerActions.UpdateUserInfo, user: userInfo }),
			);
		} else {
			(async () => {
				let value = '',
					numberOfItems = 0,
					releases = [] as UserCollectionItem[];

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
	}, [username]);

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

	return (
		<div>
			<Toolbar value={value} numOfItems={numberOfItems.toString()} />
			<Container>
				<SearchBar
					value={searchValue}
					onChange={(value) => setSearchValue(value)}
					onClear={() => setSearchValue('')}
				/>
				<StyledDivider />
				{isLoading ? (
					<SpinnerContainer>
						<CircularProgress />
					</SpinnerContainer>
				) : (
					<>
						{viewType === ViewType.TABLE && (
							<Table data={filteredData} onItemClick={showInformation} />
						)}
						{viewType === ViewType.GRID && (
							<Grid data={filteredData} onItemClick={showInformation} />
						)}
					</>
				)}
				<ViewReleaseDialog
					open={informationDialog}
					onClose={toggleInformationDialog}
				/>
			</Container>
			<Snackbar
				open={showSnackbar}
				autoHideDuration={6000}
				onClose={closeSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={closeSnackbar}
					severity={snackbarSeverity}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};
