import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	SpinnerContainer,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	StyledDivider,
} from './styles';

import { getReleaseDetails } from '../../api';
import { Button, CircularProgress } from '@mui/material';
import { ReleaseDetails } from '../../helpers/types';
import { useAppState } from '../../helpers/hooks/useAppState';

export default ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	const [details, setDetails] = useState<ReleaseDetails>();
	const { currentRelease } = useAppState();

	useEffect(() => {
		if (open) {
			(async () => {
				await getReleaseDetails(currentRelease.releaseId).then(
					(releaseDetails) => setDetails(releaseDetails),
				);
			})();
		}
	}, [open]);

	// TODO: Loading state
	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={onClose}
			aria-describedby="view-record-dialog"
			fullWidth
			id={`record-information-dialog-${currentRelease.releaseId}`}
		>
			<StyledDialogTitle>{details?.title}</StyledDialogTitle>
			<StyledDialogContent>
				<div
					style={{
						display: 'flex',
						alignContent: 'baseline',
					}}
				>
					<AlbumArtwork
						src={currentRelease.imageUrl}
						placeholder={
							<SpinnerContainer>
								<CircularProgress />
							</SpinnerContainer>
						}
					/>
					<StyledDivider orientation="vertical" />
					<div>TEST</div>
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
