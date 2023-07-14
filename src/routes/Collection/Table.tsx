import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import { type TableColumn, type TableData } from '../../helpers/types';
import { releases } from '../../testData';
import { StyledTableHead } from './styles';

const columns: TableColumn[] = [
	{
		width: 200,
		label: 'Album',
		dataKey: 'title',
	},
	{
		width: 120,
		label: 'Artist',
		dataKey: 'artist',
	},
	{
		width: 20,
		label: 'Year',
		dataKey: 'year',
		numeric: true,
	},
	{
		width: 120,
		label: 'Labels',
		dataKey: 'labels',
	},
	{
		width: 90,
		label: 'Genres',
		dataKey: 'genres',
	},
	{
		width: 120,
		label: 'Catalog #',
		dataKey: 'catno',
	},
];

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

const VirtuosoTableComponents: TableComponents<TableData> = {
	Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => (
		<Table
			{...props}
			sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
		/>
	),
	TableHead: (props) => <StyledTableHead {...props} />,
	TableRow: (props) => <TableRow {...props} />,
	TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
		<TableBody {...props} ref={ref} />
	)),
};

const fixedHeaderContent = () => (
	<TableRow>
		{columns.map((column) => (
			<TableCell
				key={column.dataKey}
				variant='head'
				align={column.numeric ?? false ? 'right' : 'left'}
				style={{ width: column.width, color: 'white' }}
			>
				{column.label}
			</TableCell>
		))}
	</TableRow>
);

const getYear = (year: number) => (year === 0 ? '' : year);

const rowContent = (_index: number, row: TableData) => (
	<React.Fragment>
		{columns.map((column) => (
			<TableCell
				key={column.dataKey}
				align={column.numeric ?? false ? 'right' : 'left'}
			>
				{column.dataKey === 'year'
					? getYear(row[column.dataKey])
					: row[column.dataKey]}
			</TableCell>
		))}
	</React.Fragment>
);

export default () => {
	return (
		<Paper style={{ width: '100%', height: 800 }}>
			<TableVirtuoso
				data={rows}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	);
};
