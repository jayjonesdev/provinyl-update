import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
} from './styles';

import { getReleaseDetails } from '../../api';
import { Button } from '@mui/material';
import { ReleaseDetails } from '../../helpers/types';
import { useAppState } from '../../helpers/hooks/useAppState';
import ReleaseDialogDetails from './ReleaseDialogDetails';

export default ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	const [details, setDetails] = useState<ReleaseDetails>({} as ReleaseDetails);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { currentRelease } = useAppState();

	useEffect(() => {
		if (open) {
			(async () => {
				setIsLoading(true);
				await getReleaseDetails(currentRelease.releaseId)
					.then((releaseDetails) => setDetails(releaseDetails))
					.finally(() => setIsLoading(false));
			})();
		}
	}, [open]);

	// TODO: Loading state
	return (
		<StyledDialog
			open={open}
			onClose={onClose}
			aria-describedby="view-record-dialog"
			id={`record-information-dialog-${currentRelease.releaseId}`}
			maxWidth="md"
		>
			<StyledDialogTitle>{currentRelease.title}</StyledDialogTitle>
			<StyledDialogContent>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						// alignItems: 'center',
					}}
				>
					<AlbumArtwork
						src={currentRelease.imageUrl}
						height={400}
						width={400}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							// alignSelf: 'start',
							marginTop: '25px',
							alignItems: 'stretch',
							marginLeft: '10px',
						}}
					>
						<ReleaseDialogDetails
							releaseDetails={details}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={onClose} variant="outlined">
					Remove
				</Button>
				<Button onClick={onClose} variant="contained">
					Close
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
