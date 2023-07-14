import { Add, Search, ViewDay, ViewList } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { ViewType } from '../../helpers/enum';
import { ButtonBar } from './styles';
import AddRecordDialog from './AddRecordDialog';
import { useState } from 'react';

export default ({
	value,
	viewType,
	onChange,
	toggleView,
}: {
	value: string;
	viewType: ViewType;
	onChange: (value: string) => void;
	toggleView: () => void;
}) => {
	const [addRecordOpen, setAddRecordOpen] = useState<boolean>(false);

	const openAddRecordDialog = () => setAddRecordOpen(true);
	const closeAddRecordDialog = () => setAddRecordOpen(false);

	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	return (
		<>
			<div>
				<ButtonBar>
					<TextField
						data-testid='collection-search-field'
						placeholder='Search collection...'
						margin='dense'
						onChange={(e) => onChange(e.target.value)}
						sx={{ width: '35%' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<IconButton onClick={() => {}}>
										<Search />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant='outlined'
						value={value}
					/>
					<div>
						<Button
							data-testid='toggle-view-type-btn'
							variant='contained'
							size='large'
							sx={{ mr: 2 }}
							onClick={toggleView}
							startIcon={<ViewTypeIcon />}
						>
							View {viewType === ViewType.GRID ? 'List' : 'Grid'}
						</Button>
						<Button
							variant='contained'
							size='large'
							onClick={openAddRecordDialog}
							startIcon={<Add />}
						>
							Add Record
						</Button>
					</div>
				</ButtonBar>
			</div>
			<AddRecordDialog
				open={addRecordOpen}
				handleClose={closeAddRecordDialog}
				handleAction={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</>
	);
};
