import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container, StyledDivider } from './styles';
import Table from './Table';
import { type TableData } from '../../helpers/types';
import { getTableData, removeDiacritics } from '../../helpers';
import { releases } from '../../testData';

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
	// TODO: Set data after API call
	const [data, setData] = useState<TableData[]>(getTableData(releases));
	const [filteredData, setFilteredData] = useState<TableData[]>([]);

	useEffect(() => {
		let filteredData = data;
		if (searchValue.length > 0) {
			filteredData = data.filter(
				(row) =>
					removeDiacritics(row.artist).includes(
						removeDiacritics(searchValue)
					) ||
					removeDiacritics(row.title).includes(removeDiacritics(searchValue))
			);
		}
		setFilteredData(filteredData);
	}, [searchValue, data]);

	const toggleViewType = () => {
		if (viewType === ViewType.GRID) setViewType(ViewType.LIST);
		else setViewType(ViewType.GRID);
	};

	return (
		<div>
			{/* TODO: Get collection information */}
			<Toolbar value='485' numOfItems='23,245' />
			<Container>
				<SearchBar
					value={searchValue}
					viewType={viewType}
					onChange={(value) => setSearchValue(value)}
					onClear={() => setSearchValue('')}
					toggleView={toggleViewType}
				/>
				<StyledDivider />
				<Table data={filteredData} />
			</Container>
		</div>
	);
};
