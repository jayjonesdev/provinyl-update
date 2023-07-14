import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { ViewType } from '../../helpers/enum';
import SearchBar from './SearchBar';
import { Container, StyledDivider } from './styles';
import Table from './Table';
import { releases } from '../../testData';
import { type TableData } from '../../helpers/types';

const rows: TableData[] = releases.map((release) => {
	const { basic_information: basicInformation } = release;
	const labels: string[] = [];
	const catnos: string[] = [];

	// TODO: remove dupes
	basicInformation.labels.forEach((label) => {
		labels.push(label.name);
		catnos.push(label.catno);
	});

	// TODO: Refactor artist filtering, currently doing two loops through the artist array
	return {
		title: basicInformation.title,
		artist: basicInformation.artists.map((artist) => artist.name).join(', '),
		year: basicInformation.year,
		labels: labels.join(', '),
		genres: basicInformation.genres.join(', '),
		catno: catnos.join(', '),
	};
});

// TODO: move to helpers folder
const removeDiacritics = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
	const [data, setData] = useState<TableData[]>(rows);

	useEffect(() => {
		let filteredData = rows;
		if (searchValue.length > 0) {
			filteredData = rows.filter((row) =>
				removeDiacritics(row.artist).includes(removeDiacritics(searchValue))
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
