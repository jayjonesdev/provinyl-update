import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Toolbar from './Toolbar';
import { useState } from 'react';
import { Add, Search, ViewDay, ViewList } from '@mui/icons-material';
import { ButtonBar, Container } from './styles';
import { ViewType } from '../../helpers/enum';

export default () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);

	const toggleViewType = () => {
		if (viewType === ViewType.GRID) setViewType(ViewType.LIST);
		else setViewType(ViewType.GRID);
	};

	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	return (
		<div>
			<Toolbar value='485' numOfItems='23,245' />
			<Container>
				<ButtonBar>
					<TextField
						data-testid='search-field'
						placeholder='Search collection...'
						margin='dense'
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
						value={searchValue}
					/>
					<div>
						<Button
							variant='contained'
							size='large'
							sx={{ mr: 2 }}
							onClick={toggleViewType}
							startIcon={<ViewTypeIcon />}
						>
							View {viewType === ViewType.GRID ? 'List' : 'Grid'}
						</Button>
						<Button variant='contained' size='large' startIcon={<Add />}>
							Add By Type
						</Button>
					</div>
				</ButtonBar>
			</Container>
		</div>
	);
};
