import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Button,
	Tooltip,
	IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlbumArtwork, ViewReleaseContainer } from './styles';
import { DatabaseSearchResponse } from '../../helpers/types';
import Detail from './Detail';
import { useState } from 'react';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import { AppReducerActions } from '../../helpers/enum';
import {
	addReleaseToCollection,
	addReleaseToWantlist,
	removeReleaseFromWantlist,
} from '../../api';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default ({ release }: { release: DatabaseSearchResponse }) => {
	const {
		artist,
		title,
		catno,
		imageUrl,
		labels,
		genres,
		year,
		country,
		releaseId,
		inWantlist,
	} = release;
	const releaseTitle = `${artist} - ${title} (${country})`;
	const [add, setAdd] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		user: { username },
	} = useAppState();
	const dispatch = useAppDispatch();

	const toggleAdd = () => setAdd(!add);
	const addRelease = async () => {
		setIsLoading(true);
		await addReleaseToCollection(username, releaseId).then((instanceId) => {
			setIsLoading(false);
			toggleAdd();
			dispatch({
				type: AppReducerActions.AddRelease,
				release: {
					...release,
					instanceId,
				},
			});
			dispatch({
				type: AppReducerActions.SetSnackbar,
				snackbar: {
					open: true,
					message: `${title} has been added to your collection.`,
					severity: 'success',
				},
			});
		});
	};
	const toggleWantList = async () => {
		setIsLoading(true);
		if (inWantlist) {
			await removeReleaseFromWantlist(username, releaseId).then(() => {
				setIsLoading(false);
				// dispatch({
				//   type: AppReducerActions.AddRelease,
				//   release: {
				//     ...release,
				//     instanceId,
				//   },
				// });
				dispatch({
					type: AppReducerActions.SetSnackbar,
					snackbar: {
						open: true,
						message: `${title} has been removed from your want list.`,
						severity: 'success',
					},
				});
			});
		} else {
			await addReleaseToWantlist(username, releaseId).then(() => {
				setIsLoading(false);
				// dispatch({
				//   type: AppReducerActions.AddRelease,
				//   release: {
				//     ...release,
				//     instanceId,
				//   },
				// });
				dispatch({
					type: AppReducerActions.SetSnackbar,
					snackbar: {
						open: true,
						message: `${title} has been added to your want list.`,
						severity: 'success',
					},
				});
			});
		}
	};

	return (
		<Accordion style={{ marginBottom: 15, borderRadius: 5 }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${releaseTitle}-content`}
				id={`${releaseTitle}-header`}
			>
				<Typography>{releaseTitle}</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ paddingTop: 0 }}>
				<ViewReleaseContainer style={{ minHeight: 210 }}>
					<AlbumArtwork
						style={{ alignSelf: 'center' }}
						src={imageUrl}
						height={200}
						width={200}
					/>
					<div style={{ marginLeft: 10 }}>
						<Detail title="Artist" desc={artist} />
						<Detail title="Title" desc={title} />
						<Detail title="Year" desc={year === 0 ? 'N/A' : year} />
						<Detail title="Labels" desc={labels} />
						<Detail title="Genres" desc={genres} />
						<Detail title="Catalog #" desc={catno} />
						<Detail title="Country" desc={country} />
						<Tooltip
							title={!inWantlist ? 'Add to want list' : 'Remove from want list'}
							placement="right-start"
						>
							<IconButton onClick={toggleWantList} disabled={isLoading}>
								{inWantlist ? <Favorite color="primary" /> : <FavoriteBorder />}
							</IconButton>
						</Tooltip>
					</div>
				</ViewReleaseContainer>
			</AccordionDetails>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					width: '100%',
					padding: '1em 1em',
					alignItems: 'center',
				}}
			>
				{!add ? (
					<Button variant="outlined" onClick={toggleAdd}>
						Add
					</Button>
				) : (
					<>
						<Typography variant="body1" marginRight={2} fontWeight={600}>
							Are you sure you want to add this release?
						</Typography>
						<Button
							onClick={addRelease}
							variant="contained"
							color="success"
							disabled={isLoading}
						>
							Yes
						</Button>
						<Button
							style={{ marginLeft: 5 }}
							onClick={toggleAdd}
							variant="contained"
							color="error"
							disabled={isLoading}
						>
							No
						</Button>
					</>
				)}
			</div>
		</Accordion>
	);
};
