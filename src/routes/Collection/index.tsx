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
} from '../../api';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import Grid from './Grid';
import ViewRecordDialog from './ViewRecordDialog';
import { CircularProgress } from '@mui/material';

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
	const [data, setData] = useState<UserCollectionItem[]>([]);
	const [filteredData, setFilteredData] = useState<UserCollectionItem[]>([]);
	const [informationDialog, setInformationDialog] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		user: { username },
		collection: { value, numberOfItems },
	} = useAppState();
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

	const toggleViewType = () => {
		if (viewType === ViewType.GRID) setViewType(ViewType.LIST);
		else setViewType(ViewType.GRID);
	};

	useEffect(() => {
		setIsLoading(true);
		if (username.length === 0) {
			getUserInfo().then((userInfo) =>
				dispatch({ type: AppReducerActions.UpdateUserInfo, user: userInfo }),
			);
		} else {
			(async () => {
				let value = '',
					numberOfItems = 0;

				await getUserCollection(username).then((collection) => {
					setData(collection.items);
					numberOfItems = collection.items.length;
				});
				await getUserCollectionValue(username).then(
					(collectionValue) => (value = collectionValue),
				);
				dispatch({
					type: AppReducerActions.UpdateCollectionInfo,
					collection: { value, numberOfItems },
				});
				setIsLoading(false);
			})();
		}
	}, [username]);

	return (
		<div>
			<Toolbar value={value} numOfItems={numberOfItems.toString()} />
			{
				<Container>
					<SearchBar
						value={searchValue}
						viewType={viewType}
						onChange={(value) => setSearchValue(value)}
						onClear={() => setSearchValue('')}
						toggleView={toggleViewType}
					/>
					<StyledDivider />
					{isLoading ? (
						<SpinnerContainer>
							<CircularProgress />
						</SpinnerContainer>
					) : (
						<>
							{viewType === ViewType.LIST && (
								<Table data={filteredData} onItemClick={showInformation} />
							)}
							{viewType === ViewType.GRID && (
								<Grid data={filteredData} onItemClick={showInformation} />
							)}
						</>
					)}
					<ViewRecordDialog
						open={informationDialog}
						onClose={toggleInformationDialog}
					/>
				</Container>
			}
		</div>
	);
};
