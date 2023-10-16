import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	ViewReleaseContainer,
} from './styles';

import { getReleaseDetails, removeReleaseFromCollection } from '../../api';
import { Button, Typography } from '@mui/material';
import { ReleaseDetails } from '../../helpers/types';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import ReleaseDialogDetails from './ReleaseDialogDetails';
import { AppReducerActions } from '../../helpers/enum';

export default ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	const [details, setDetails] = useState<ReleaseDetails>({} as ReleaseDetails);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [remove, setRemove] = useState<boolean>(false);
	const {
		currentRelease,
		user: { username },
	} = useAppState();
	const dispatch = useAppDispatch();

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

	const toggleRemove = () => setRemove(!remove);
	const removeRelease = async () => {
		setIsLoading(true);
		await removeReleaseFromCollection(
			username,
			currentRelease.releaseId.toString(),
			currentRelease.instanceId.toString(),
		).then(() => {
			setIsLoading(false);
			onClose();
			dispatch({
				type: AppReducerActions.RemoveRelease,
				releaseId: currentRelease.releaseId,
			});
			dispatch({
				type: AppReducerActions.SetSnackbar,
				snackbar: {
					open: true,
					message: `${currentRelease.title} has been removed from your collection.`,
					severity: 'success',
				},
			});
		});
	};

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
				{!remove ? (
					<>
						<Button onClick={toggleRemove} variant="outlined">
							Remove
						</Button>
						<Button onClick={onClose} variant="contained">
							Close
						</Button>
					</>
				) : (
					<>
						<Typography variant="body1" marginRight={2} fontWeight={600}>
							Are you sure you want to remove this release?
						</Typography>
						<Button
							onClick={removeRelease}
							variant="contained"
							color="success"
							disabled={isLoading}
						>
							Yes
						</Button>
						<Button
							onClick={toggleRemove}
							variant="contained"
							color="error"
							disabled={isLoading}
						>
							No
						</Button>
					</>
				)}
			</StyledDialogActions>
		</StyledDialog>
	);
};
