import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	ViewReleaseContainer,
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
				<ViewReleaseContainer>
					<AlbumArtwork
						src={currentRelease.imageUrl}
						height={400}
						width={400}
					/>
					<ReleaseDialogDetails
						releaseDetails={details}
						isLoading={isLoading}
					/>
				</ViewReleaseContainer>
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
