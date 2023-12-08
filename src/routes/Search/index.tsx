import { Close } from '@mui/icons-material';
import {
	Alert,
	AppBar,
	Button,
	CircularProgress,
	Snackbar,
	Toolbar,
	Typography,
} from '@mui/material';
import SearchBar from '../Collection/SearchBar';
import { useEffect, useState } from 'react';
import {
	Container,
	SpinnerContainer,
	StyledDivider,
} from '../Collection/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { addReleaseToCollection, searchDatabase } from '../../api';
import { DatabaseSearchResponse, ReleaseSearchType } from '../../helpers/types';
import {
	AppReducerActions,
	ReleaseListType,
	SearchType,
} from '../../helpers/enum';
import { getSearchTypeKey } from '../../helpers';
import ReleaseGrid from './ReleaseGrid';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';

export default () => {
	const navigate = useNavigate();
	const { searchType } = useParams<{ searchType: ReleaseSearchType }>();
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isScanBarcode, setIsScanBarcode] = useState(false);
	const [releases, setReleases] = useState<DatabaseSearchResponse[]>([]);
	const dispatch = useAppDispatch();
	const {
		user: { username },
		snackbar,
	} = useAppState();
	const {
		open: showSnackbar,
		message: snackbarMessage,
		severity: snackbarSeverity,
	} = snackbar;

	useEffect(() => {
		setIsScanBarcode(searchType === getSearchTypeKey(SearchType.BARCODE));
	}, [searchType]);

	const closeSnackbar = () =>
		dispatch({
			type: AppReducerActions.SetSnackbar,
			snackbar: { ...snackbar, open: false },
		});

	const close = () => navigate(`/collection`);

	const clear = () => {
		setSearchValue('');
		setReleases([]);
	};

	const search = async () => {
		setIsLoading(true);

		if (searchType) {
			await searchDatabase(searchValue, searchType)
				.then((results) => {
					setReleases(results);
				})
				.finally(() => setIsLoading(false));
		}
	};

	const addCleanUp = (release: DatabaseSearchResponse, instanceId: number) => {
		setIsLoading(false);
		dispatch({
			type: AppReducerActions.AddRelease,
			release: {
				...release,
				instanceId,
			},
			list: ReleaseListType.Collection,
		});
		dispatch({
			type: AppReducerActions.SetSnackbar,
			snackbar: {
				open: true,
				message: `${release.title} has been added to your collection.`,
				severity: 'success',
			},
		});
		clear();
	};
	const addRelease = async (release: DatabaseSearchResponse) => {
		setIsLoading(true);
		await addReleaseToCollection(username, release.releaseId)
			.then((instanceId) => {
				addCleanUp(release, instanceId);
			})
			.catch(() => {
				dispatch({
					type: AppReducerActions.SetSnackbar,
					snackbar: {
						open: true,
						message: `Unable to add this release to your collection, please try again.`,
						severity: 'error',
					},
				});
			});
	};

	return (
		<>
			<div>
				<AppBar position="fixed">
					<Toolbar
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="h6" component="div">
							{isScanBarcode
								? 'Scan Barcode'
								: `Search by ${searchType && SearchType[searchType]}`}
						</Typography>
						<Close onClick={close} />
					</Toolbar>
				</AppBar>
				<Container>
					<div style={{ marginTop: 50 }}>
						{releases.length > 0 && (
							<>
								<Button
									style={{ marginBottom: 20 }}
									variant="outlined"
									color="secondary"
									fullWidth
									onClick={clear}
									disabled={isLoading}
								>
									Clear
								</Button>
								{!isLoading ? (
									<ReleaseGrid data={releases} add={addRelease} />
								) : (
									<SpinnerContainer>
										<CircularProgress />
									</SpinnerContainer>
								)}
							</>
						)}
						{!isScanBarcode ? (
							<>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<SearchBar
										value={searchValue}
										readOnly={false}
										onChange={(value: string) => setSearchValue(value)}
										onClear={() => setSearchValue('')}
										style={{ maxWidth: '90%' }}
										disabled={isLoading}
									/>
									<Button
										variant="contained"
										size="large"
										style={{ height: '50%' }}
										onClick={search}
										disabled={isLoading}
									>
										Search
									</Button>
								</div>
								<StyledDivider />
							</>
						) : (
							<>BARCODE</>
						)}
					</div>
				</Container>
			</div>
			<Snackbar
				open={showSnackbar}
				autoHideDuration={6000}
				onClose={closeSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={closeSnackbar}
					severity={snackbarSeverity}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};
