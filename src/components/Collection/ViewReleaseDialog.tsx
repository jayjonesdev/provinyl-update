import { useEffect, useState } from 'react';
import {
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
import { ReleaseDetails, SnackbarType } from '../../helpers/types';
import { useAppDispatch } from '../../helpers/hooks/useAppState';
import ReleaseDialogDetails from './ReleaseDialogDetails';
import { AppReducerActions, ReleaseListType } from '../../helpers/enum';
import SnackbarContainer from '../shared/SnackbarContainer';
import { AlbumArtwork } from '../shared/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	releaseDialogState,
	uiState,
	userInfoState,
} from '../../helpers/atoms';

export default () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [remove, setRemove] = useState<boolean>(false);
	const [add, setAdd] = useState<boolean>(false);
	const [releaseDialog, setReleaseDialog] = useRecoilState(releaseDialogState);
	const { readOnly, currentTab } = useRecoilValue(uiState);
	const { username } = useRecoilValue(userInfoState);
	const wantList = currentTab === ReleaseListType.Collection;
	const [snackbar, setSnackbar] = useState<SnackbarType>({
		message: '',
		open: false,
		severity: 'success',
	});
	const { release: currentRelease, showReleaseDialog: open } = releaseDialog;
	const dispatch = useAppDispatch();

	const onClose = () => {
		setReleaseDialog({ ...releaseDialog, showReleaseDialog: false });
	};

	const setReleaseDetails = (details: ReleaseDetails) => {
		setReleaseDialog({ ...releaseDialog, releaseDetails: details });
	};

	useEffect(() => {
		if (open) {
			(async () => {
				setIsLoading(true);
				if (!readOnly) {
					await getReleaseDetails(currentRelease.releaseId)
						.then(setReleaseDetails)
						.finally(() => setIsLoading(false));
				} else {
					await getPublicReleaseDetails(currentRelease.releaseId)
						.then(setReleaseDetails)
						.finally(() => setIsLoading(false));
				}
			})();
		}
	}, [open]);

	const toggleRemove = () => setRemove(!remove);
	const toggleAdd = () => setAdd(!add);
	const cleanUpRemove = () => {
		setIsLoading(false);
		toggleRemove();
		onClose();
		dispatch({
			type: AppReducerActions.RemoveRelease,
			releaseId: currentRelease.releaseId,
			list: wantList ? ReleaseListType.WantList : ReleaseListType.Collection,
		});
		setSnackbar({
			open: true,
			message: `${currentRelease.title} has been removed from your ${
				wantList ? 'want list' : 'collection'
			}.`,
			severity: 'success',
		});
	};
	const removeRelease = async () => {
		setIsLoading(true);

		if (wantList) {
			await removeReleaseFromWantlist(username, currentRelease.releaseId).then(
				() => {
					cleanUpRemove();
				},
			);
		} else {
			await removeReleaseFromCollection(
				username,
				currentRelease.releaseId.toString(),
				currentRelease.instanceId.toString(),
			).then(() => {
				cleanUpRemove();
			});
		}
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
					list: ReleaseListType.Collection,
				});
				setSnackbar({
					open: true,
					message: `${currentRelease.title} has been added to your collection.`,
					severity: 'success',
				});

				await removeReleaseFromWantlist(
					username,
					currentRelease.releaseId,
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
		<>
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
						<ReleaseDialogDetails isLoading={isLoading} />
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
								Are you sure you want to {remove ? 'remove' : 'add'} this
								release?
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
			<SnackbarContainer
				severity={snackbar.severity}
				open={snackbar.open}
				message={snackbar.message}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
			/>
		</>
	);
};
