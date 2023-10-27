import { useEffect, useState } from 'react';
import {
	AlbumArtwork,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogTitle,
	ViewReleaseContainer,
} from './styles';

import {
	addReleaseToCollection,
	getPublicReleaseDetails,
	getReleaseDetails,
	removeReleaseFromCollection,
	removeReleaseFromWantlist,
} from '../../api';
import { Button, Typography } from '@mui/material';
import { ReleaseDetails } from '../../helpers/types';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import ReleaseDialogDetails from './ReleaseDialogDetails';
import { AppReducerActions, ReleaseListType } from '../../helpers/enum';

export default ({
	open,
	readOnly,
	onClose,
}: {
	open: boolean;
	readOnly: boolean;
	onClose: () => void;
}) => {
	const [details, setDetails] = useState<ReleaseDetails>({} as ReleaseDetails);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [remove, setRemove] = useState<boolean>(false);
	const [add, setAdd] = useState<boolean>(false);
	const {
		currentRelease,
		user: { username },
	} = useAppState();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (open) {
			(async () => {
				setIsLoading(true);
				if (!readOnly) {
					await getReleaseDetails(currentRelease.releaseId)
						.then((releaseDetails) => setDetails(releaseDetails))
						.finally(() => setIsLoading(false));
				} else {
					await getPublicReleaseDetails(currentRelease.releaseId)
						.then((releaseDetails) => setDetails(releaseDetails))
						.finally(() => setIsLoading(false));
				}
			})();
		}
	}, [open]);

	const toggleRemove = () => setRemove(!remove);
	const toggleAdd = () => setAdd(!add);
	const removeRelease = async () => {
		setIsLoading(true);
		await removeReleaseFromCollection(
			username,
			currentRelease.releaseId.toString(),
			currentRelease.instanceId.toString(),
		).then(() => {
			setIsLoading(false);
			toggleRemove();
			onClose();
			dispatch({
				type: AppReducerActions.RemoveRelease,
				releaseId: currentRelease.releaseId,
				list: ReleaseListType.Collection,
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
	const addWantListRelease = async () => {
		setIsLoading(true);
		await addReleaseToCollection(username, currentRelease.releaseId).then(
			async (instanceId) => {
				dispatch({
					type: AppReducerActions.AddRelease,
					release: {
						...currentRelease,
						instanceId,
					},
				});
				dispatch({
					type: AppReducerActions.SetSnackbar,
					snackbar: {
						open: true,
						message: `${currentRelease.title} has been added to your collection.`,
						severity: 'success',
					},
				});

				await removeReleaseFromWantlist(
					username,
					currentRelease.releaseId.toString(),
				).then(() => {
					dispatch({
						type: AppReducerActions.RemoveRelease,
						releaseId: currentRelease.releaseId,
						list: ReleaseListType.WantList,
					});
				});
				setIsLoading(false);
				toggleAdd();
				onClose();
			},
		);
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
				<ViewReleaseContainer style={{ paddingTop: 25 }}>
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
				{!remove && !add && (
					<>
						{currentRelease.wantList && !add && (
							<Button onClick={toggleAdd} variant="outlined">
								Add
							</Button>
						)}
						{!readOnly && (
							<Button onClick={toggleRemove} variant="outlined">
								Remove
							</Button>
						)}
						<Button onClick={onClose} variant="contained">
							Close
						</Button>
					</>
				)}
				{(add || remove) && (
					<>
						<Typography variant="body1" marginRight={2} fontWeight={600}>
							Are you sure you want to {remove ? 'remove' : 'add'} this release?
						</Typography>
						<Button
							onClick={remove ? removeRelease : addWantListRelease}
							variant="contained"
							color="success"
							disabled={isLoading}
						>
							Yes
						</Button>
						<Button
							onClick={remove ? toggleRemove : toggleAdd}
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
