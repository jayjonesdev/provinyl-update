import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import {
	SearchContainer,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	StyledHelperText,
} from './styles';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { SearchType } from '../../helpers/enum';

export default ({
	open,
	handleClose,
	handleAction,
}: {
	open: boolean;
	handleClose: () => void;
	handleAction: () => void;
}) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchType, setSearchType] = useState<SearchType | null>(null);

	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={handleClose}
			aria-describedby='add-record-dialog'
			fullWidth
		>
			<StyledDialogTitle>Add Record</StyledDialogTitle>
			<StyledDialogContent>
				<SearchContainer>
					<TextField
						data-testid='search-field'
						placeholder='Search...'
						sx={{ flexGrow: 1, mr: 2 }}
						onChange={(e) => setSearchValue(e.target.value)}
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
					<FormControl>
						<Select
							id='search-type-select'
							value={searchType}
							onChange={(e) => setSearchType(e.target.value as SearchType)}
						>
							{Object.entries(SearchType).map(([key, value]) => (
								<MenuItem key={key} value={key}>
									{value}
								</MenuItem>
							))}
						</Select>
						<StyledHelperText>Please select a search type</StyledHelperText>
					</FormControl>
				</SearchContainer>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={handleClose} variant='outlined'>
					Close
				</Button>
				<Button onClick={handleAction} variant='contained'>
					Search
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
