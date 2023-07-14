import * as React from 'react';
import {
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material';
import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import { type TableColumn, type TableData } from '../../helpers/types';
import { StyledTable, StyledTableHead, StyledTableRow } from './styles';

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
		width: 110,
		label: 'Genres',
		dataKey: 'genres',
	},
	{
		width: 120,
		label: 'Catalog #',
		dataKey: 'catno',
	},
];

const VirtuosoTableComponents: TableComponents<TableData> = {
	Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => <StyledTable {...props} />,
	TableHead: (props) => <StyledTableHead {...props} />,
	TableRow: (props) => <StyledTableRow {...props} />,
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
				style={{
					width: column.width,
					color: 'white',
					fontWeight: 600,
				}}
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

export default ({ data }: { data: TableData[] }) => {
	return (
		// TODO: Make table full height
		<Paper style={{ width: '100%', height: 800 }}>
			<TableVirtuoso
				data={data}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	);
};
