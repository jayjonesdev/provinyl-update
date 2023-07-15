import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container, StyledDivider } from './styles';
import Table from './Table';
import { releases } from '../../testData';
import { type TableData } from '../../helpers/types';
import { removeDiacritics } from '../../helpers';

const rows: TableData[] = releases.map((release) => {
	const { basic_information: basicInformation } = release;
	const labels = new Set<string>();
	const catnos = new Set<string>();

	basicInformation.labels.forEach((label) => {
		labels.add(label.name);
		catnos.add(label.catno);
	});

	return {
		title: basicInformation.title,
		artist: basicInformation.artists
			.reduce((artists, artist) => `${artists}, ${artist.name}`, '')
			.slice(1),
		year: basicInformation.year,
		labels: [...new Set(labels)].join(', '),
		genres: basicInformation.genres.join(', '),
		catno: [...new Set(catnos)].join(', '),
	};
});

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
	const [data, setData] = useState<TableData[]>(rows);

	useEffect(() => {
		let filteredData = rows;
		if (searchValue.length > 0) {
			filteredData = rows.filter(
				(row) =>
					removeDiacritics(row.artist).includes(
						removeDiacritics(searchValue)
					) ||
					removeDiacritics(row.title).includes(removeDiacritics(searchValue))
			);
		}
		setData(filteredData);
	}, [searchValue]);

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
				<Table data={data} />
			</Container>
		</div>
	);
};
