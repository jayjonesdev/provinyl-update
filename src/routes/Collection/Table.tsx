import { forwardRef } from 'react';
import {
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material';
import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import { type TableColumn, type TableData } from '../../helpers/types';
import {
	StyledCell,
	StyledTable,
	StyledTableHead,
	StyledTableRow,
} from './styles';

const columns: TableColumn[] = [
	{
		width: '20%',
		label: 'Album',
		dataKey: 'title',
	},
	{
		width: '10%',
		label: 'Artist',
		dataKey: 'artist',
	},
	{
		width: '5%',
		label: 'Year',
		dataKey: 'year',
		numeric: true,
	},
	{
		width: '17%',
		label: 'Labels',
		dataKey: 'labels',
	},
	{
		width: '9.5%',
		label: 'Genres',
		dataKey: 'genres',
	},
	{
		width: '10%',
		label: 'Catalog #',
		dataKey: 'catno',
	},
];

const VirtuosoTableComponents: TableComponents<TableData> = {
	Scroller: forwardRef<HTMLDivElement>((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => <StyledTable {...props} />,
	TableHead: (props) => <StyledTableHead {...props} />,
	TableRow: (props) => <StyledTableRow {...props} />,
	TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
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
					fontWeight: 800,
					fontSize: 16,
				}}
			>
				{column.label}
			</TableCell>
		))}
	</TableRow>
);

const getYear = (year: number) => (year === 0 ? '' : year);

const rowContent = (_index: number, row: TableData) => (
	<>
		{columns.map((column) => (
			<StyledCell
				key={column.dataKey}
				align={column.numeric ?? false ? 'right' : 'left'}
			>
				{column.dataKey === 'year'
					? getYear(row[column.dataKey])
					: row[column.dataKey]}
			</StyledCell>
		))}
	</>
);

export default ({ data }: { data: TableData[] }) => {
	return (
		<Paper style={{ height: window.screen.height * 0.85 }}>
			<TableVirtuoso
				data={data}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	);
};
