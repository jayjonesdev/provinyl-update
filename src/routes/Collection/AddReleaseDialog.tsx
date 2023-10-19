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
import { searchDatabase } from '../../api';
import { DatabaseSearchResponse, ReleaseSearchType } from '../../helpers/types';
import SearchResult from './SearchResult';

const getSearchTypeKey = (value: SearchType): ReleaseSearchType =>
	Object.keys(SearchType)[
		Object.values(SearchType).indexOf(value)
	] as ReleaseSearchType;

export default ({
	open,
	handleClose,
}: {
	open: boolean;
	handleClose: () => void;
}) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchType, setSearchType] = useState<ReleaseSearchType>(
		getSearchTypeKey(SearchType.ALBUM_TITLE),
	);
	const [releases, setReleases] = useState<DatabaseSearchResponse[]>([]);

	const reset = () => {
		setSearchValue('');
		setSearchType(getSearchTypeKey(SearchType.ALBUM_TITLE));
	};

	const closeDialog = () => {
		reset();
		handleClose();
	};

	const search = async () => {
		await searchDatabase(searchValue, searchType).then((results) => {
			setReleases(results);
		});
		// reset();
	};

	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={handleClose}
			aria-describedby="add-record-dialog"
			fullWidth
		>
			<StyledDialogTitle>Add Record</StyledDialogTitle>
			<StyledDialogContent>
				<SearchContainer>
					<TextField
						data-testid="add-record-search-field"
						placeholder="Search..."
						sx={{ flexGrow: 1, mr: 2 }}
						onChange={(e) => setSearchValue(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton onClick={() => {}}>
										<Search />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="outlined"
						value={searchValue}
					/>
					<FormControl>
						<Select
							id="search-type-select"
							value={searchType}
							onChange={(e) => {
								setSearchType(e.target.value as ReleaseSearchType);
							}}
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
				<div style={{ maxHeight: 350, overflow: 'scroll', marginTop: 5 }}>
					{releases.length > 0 &&
						releases.map((release) => (
							<SearchResult key={release.releaseId} release={release} />
						))}
				</div>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={closeDialog} variant="outlined">
					Close
				</Button>
				<Button
					onClick={search}
					variant="contained"
					disabled={searchType.length === 0 || searchValue.length === 0}
				>
					Search
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
