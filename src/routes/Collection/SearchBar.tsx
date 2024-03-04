import {
	Add,
	CloseOutlined,
	Search,
	ViewDay,
	ViewList,
} from '@mui/icons-material';
import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Switch,
	Typography,
} from '@mui/material';
import { AppReducerActions, ViewType } from '../../helpers/enum';
import { ButtonBar } from './styles';
import { CSSProperties, useState } from 'react';
import AddReleaseDialog from './AddReleaseDialog';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import { isMobile } from 'react-device-detect';

export default ({
	value,
	readOnly,
	style,
	disabled,
	onChange,
	onClear,
}: {
	value: string;
	readOnly: boolean;
	style?: CSSProperties;
	disabled?: boolean;
	onChange: (value: string) => void;
	onClear: () => void;
}) => {
	const {
		ui: { viewType, wantList },
	} = useAppState();
	const [addReleaseDialogOpen, setAddReleaseDialogOpen] =
		useState<boolean>(false);
	const toggleAddReleaseDialog = () =>
		setAddReleaseDialogOpen(!addReleaseDialogOpen);
	const dispatch = useAppDispatch();

	const changeView = (viewType: ViewType) =>
		dispatch({
			type: AppReducerActions.UpdateView,
			viewType,
		});

	const toggleView = () => {
		if (viewType === ViewType.GRID) changeView(ViewType.TABLE);
		else changeView(ViewType.GRID);
	};

	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	const toggleWantList = () =>
		dispatch({ type: AppReducerActions.ShowWantList, wantList: !wantList });

	return (
		<>
			<div style={{ marginTop: isMobile ? 5 : 75 }}>
				<ButtonBar>
					<TextField
						disabled={disabled}
						data-testid="collection-search-field"
						placeholder={isMobile ? 'Search...' : 'Search collection...'}
						margin="dense"
						onChange={(e) => onChange(e.target.value)}
						sx={{ width: isMobile ? '100%' : '45%' }}
						style={style}
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
					<div style={{ display: 'flex' }}>
						{!readOnly && !isMobile && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									marginRight: 25,
								}}
							>
								<Switch
									checked={wantList}
									onChange={toggleWantList}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
								<Typography>View Want List</Typography>
							</div>
						)}
						{!readOnly && isMobile && (
							<Button
								variant="contained"
								style={{ marginLeft: 5, marginTop: 65 }}
								size="small"
								onClick={toggleWantList}
							>
								View {wantList ? 'Collection' : 'Want List'}
							</Button>
						)}
						{!isMobile && (
							<Button
								data-testid="toggle-view-type-btn"
								variant="contained"
								size="large"
								sx={{ mr: 2 }}
								onClick={toggleView}
								startIcon={<ViewTypeIcon />}
							>
								View {viewType === ViewType.GRID ? 'Table' : 'Grid'}
							</Button>
						)}
						{!readOnly && !isMobile && (
							<Button
								variant="contained"
								size="large"
								onClick={toggleAddReleaseDialog}
								startIcon={<Add />}
							>
								Add {!isMobile && 'Record'}
							</Button>
						)}
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
