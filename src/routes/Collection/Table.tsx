import { forwardRef, useRef, useState } from 'react';
import {
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material';
import {
	TableVirtuoso,
	type TableComponents,
	VirtuosoHandle,
} from 'react-virtuoso';
import { type TableColumn, type TableData } from '../../helpers/types';
import {
	StyledCell,
	StyledTable,
	StyledTableHead,
	StyledTableRow,
} from './styles';
import ViewRecordDialog from './ViewRecordDialog';

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
	TableHead: forwardRef((props, ref) => (
		<StyledTableHead {...props} ref={ref} />
	)),
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

export default ({ data }: { data: TableData[] }) => {
	const [informationDialog, setInformationDialog] = useState<boolean>(false);
	const [releaseId, setReleaseId] = useState<number>(0);
	const showInformation = (id: number) => {
		toggleInformationDialog();
		setReleaseId(id);
	};
	const toggleInformationDialog = () =>
		setInformationDialog(!informationDialog);

	const rowContent = (_index: number, row: TableData) => (
		<>
			{columns.map((column) => (
				<StyledCell
					key={column.dataKey}
					align={column.numeric ?? false ? 'right' : 'left'}
					onClick={() => showInformation(row.releaseId)}
				>
					{column.dataKey === 'year'
						? getYear(row[column.dataKey])
						: row[column.dataKey].toString().replace(/ *\([^)]*\) */g, '')}
				</StyledCell>
			))}
		</>
	);

	return (
		<Paper style={{ height: window.screen.height * 0.85 }}>
			<TableVirtuoso
				data={data}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
			<ViewRecordDialog
				open={informationDialog}
				id={releaseId}
				onClose={toggleInformationDialog}
			/>
		</Paper>
	);
};
