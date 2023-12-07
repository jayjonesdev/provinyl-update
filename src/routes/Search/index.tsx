import { Close } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import SearchBar from '../Collection/SearchBar';
import { useEffect, useState } from 'react';
import { Container, StyledDivider } from '../Collection/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { searchDatabase } from '../../api';
import { DatabaseSearchResponse, ReleaseSearchType } from '../../helpers/types';
import { SearchType } from '../../helpers/enum';
import { getSearchTypeKey } from '../../helpers';

export default () => {
	const navigate = useNavigate();
	const { searchType } = useParams<{ searchType: ReleaseSearchType }>();
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isScanBarcode, setIsScanBarcode] = useState(false);
	const [releases, setReleases] = useState<DatabaseSearchResponse[]>([]);

	useEffect(() => {
		setIsScanBarcode(searchType === getSearchTypeKey(SearchType.BARCODE));
	}, [searchType]);

	const close = () => navigate(`/collection`);

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

	return (
		<div>
			<AppBar position="static">
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
				{!isScanBarcode && (
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
							/>
							<Button
								variant="contained"
								size="large"
								style={{ height: '50%' }}
								onClick={search}
							>
								Search
							</Button>
						</div>
						<StyledDivider />
					</>
				)}
			</Container>
		</div>
	);
};
