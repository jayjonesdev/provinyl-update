import { Close } from '@mui/icons-material';
import {
	AppBar,
	Button,
	CircularProgress,
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
import {
	DatabaseSearchResponse,
	ReleaseSearchType,
	SnackbarType,
} from '../../helpers/types';
import {
	AppReducerActions,
	ReleaseListType,
	SearchType,
} from '../../helpers/enum';
import { getSearchTypeKey } from '../../helpers';
import ReleaseGrid from './ReleaseGrid';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import { isMobile } from 'react-device-detect';
import BarcodeScanner from '../Collection/BarcodeScanner';
import SnackbarContainer from '../shared/SnackbarContainer';

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
	} = useAppState();
	const [snackbar, setSnackbar] = useState<SnackbarType>({
		message: '',
		open: false,
		severity: 'success',
	});

	useEffect(() => {
		setIsScanBarcode(searchType === getSearchTypeKey(SearchType.BARCODE));
	}, [searchType]);

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
		setSnackbar({
			open: true,
			message: `${release.title} has been added to your collection.`,
			severity: 'success',
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
				setSnackbar({
					open: true,
					message: `Unable to add this release to your collection, please try again.`,
					severity: 'error',
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
				<Container isMobile={isMobile}>
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
							<BarcodeScanner />
						)}
					</div>
				</Container>
			</div>
			<SnackbarContainer
				severity={snackbar.severity}
				open={snackbar.open}
				message={snackbar.message}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
			/>
		</>
	);
};
