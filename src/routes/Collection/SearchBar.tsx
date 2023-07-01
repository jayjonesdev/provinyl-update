import { Add, Search, ViewDay, ViewList } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { ViewType } from '../../helpers/enum';
import { ButtonBar, Container } from './styles';
import LogoutDialog from './LogoutDialog';

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
	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	return (
		<>
			<Container>
				<ButtonBar>
					<TextField
						data-testid='search-field'
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
							variant='contained'
							size='large'
							sx={{ mr: 2 }}
							onClick={toggleView}
							startIcon={<ViewTypeIcon />}
						>
							View {viewType === ViewType.GRID ? 'List' : 'Grid'}
						</Button>
						<Button variant='contained' size='large' startIcon={<Add />}>
							Add Record
						</Button>
					</div>
				</ButtonBar>
			</Container>
			
		</>
	);
};
