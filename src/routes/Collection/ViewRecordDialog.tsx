import React, { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogContent,
	StyledDialogTitle,
	StyledDivider,
} from './styles';
import { type ReleaseDetail } from '../../helpers/types';

import { releaseDetail as mockDetails } from '../../testData';
import { Divider } from '@mui/material';

export default ({
	id,
	open,
	onClose,
}: {
	id: number;
	open: boolean;
	onClose: () => void;
}) => {
	const [details, setDetails] = useState<any>();

	useEffect(() => setDetails(mockDetails), []);

	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={onClose}
			aria-describedby='view-record-dialog'
			fullWidth
		>
			<StyledDialogTitle>{details?.title}</StyledDialogTitle>
			<StyledDialogContent>
				<div style={{display: 'flex'}}>
					<AlbumArtwork src={details?.images[0].uri} />
					<StyledDivider orientation='vertical'  />
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
			{/* <StyledDialogActions>
				<Button onClick={closeDialog} variant='outlined'>
					Close
				</Button>
				<Button onClick={search} variant='contained'>
					Search
				</Button>
			</StyledDialogActions> */}
		</StyledDialog>
	);
};
