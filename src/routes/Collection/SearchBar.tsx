import {
	Add,
	CloseOutlined,
	Search,
	ViewDay,
	ViewList,
} from '@mui/icons-material';
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { ViewType } from '../../helpers/enum';
import { ButtonBar } from './styles';
import { useState } from 'react';
import AddReleaseDialog from './AddReleaseDialog';

export default ({
	value,
	viewType,
	onChange,
	onClear,
	toggleView,
}: {
	value: string;
	viewType: ViewType;
	onChange: (value: string) => void;
	onClear: () => void;
	toggleView: () => void;
}) => {
	const [addReleaseDialogOpen, setAddReleaseDialogOpen] =
		useState<boolean>(false);
	const toggleAddReleaseDialog = () =>
		setAddReleaseDialogOpen(!addReleaseDialogOpen);

	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	return (
		<>
			<div>
				<ButtonBar>
					<TextField
						data-testid="collection-search-field"
						placeholder="Search collection..."
						margin="dense"
						onChange={(e) => onChange(e.target.value)}
						sx={{ width: '35%' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton>
										<Search />
									</IconButton>
								</InputAdornment>
							),
							endAdornment: value.length > 0 && (
								<InputAdornment position="end">
									<IconButton onClick={onClear}>
										<CloseOutlined />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="outlined"
						value={value}
					/>
					<div>
						<Button
							data-testid="toggle-view-type-btn"
							variant="contained"
							size="large"
							sx={{ mr: 2 }}
							onClick={toggleView}
							startIcon={<ViewTypeIcon />}
						>
							View {viewType === ViewType.GRID ? 'List' : 'Grid'}
						</Button>
						<Button
							variant="contained"
							size="large"
							onClick={toggleAddReleaseDialog}
							startIcon={<Add />}
						>
							Add Record
						</Button>
					</div>
				</ButtonBar>
			</div>
			<AddReleaseDialog
				open={addReleaseDialogOpen}
				handleClose={toggleAddReleaseDialog}
			/>
		</>
	);
};
