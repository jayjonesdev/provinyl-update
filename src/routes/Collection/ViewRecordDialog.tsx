import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	StyledDivider,
} from './styles';

import { releaseDetail as mockDetails } from '../../testData';
import { getReleaseDetails } from '../../api';
import { Button } from '@mui/material';
import { ReleaseDetails } from '../../helpers/types';

export default ({
	id,
	open,
	onClose,
}: {
	id: number;
	open: boolean;
	onClose: () => void;
}) => {
	const [details, setDetails] = useState<ReleaseDetails>();

	useEffect(() => {
		if (open) {
			(async () => {
				await getReleaseDetails(id).then((releaseDetails) =>
					setDetails(releaseDetails),
				);
			})();
		}
	}, [id]);

	// TODO: Loading state
	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={onClose}
			aria-describedby="view-record-dialog"
			fullWidth
			id={`record-information-dialog-${id}`}
		>
			<StyledDialogTitle>{details?.title}</StyledDialogTitle>
			<StyledDialogContent>
				<div style={{ display: 'flex' }}>
					<AlbumArtwork src={details?.coverArtUri} />
					<StyledDivider orientation="vertical" />
				</div>
				{/* <SearchContainer>
					<TextField
						data-testid='add-record-search-field'
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
				</SearchContainer> */}
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={onClose} variant="contained">
					Close
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
