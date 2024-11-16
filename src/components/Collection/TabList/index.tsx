import { TabContext, TabList } from '@mui/lab';
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { ReleaseListType } from '../../../helpers/enum';
import CollectionTabPanel from '../CollectionTabPanel';
import Tab from './Tab';
import { useRecoilState } from 'recoil';
import { uiState } from '../../../helpers/atoms';

export default () => {
	const [{ currentTab, readOnly }, setUiState] = useRecoilState(uiState);

	const onChange = (
		_event: React.SyntheticEvent,
		releaseListType: ReleaseListType,
	) => {
		setUiState((prev) => ({
			...prev,
			currentTab: releaseListType,
			searchString: '',
		}));
	};

	return (
		<TabContext value={currentTab}>
			{!readOnly && (
				<Box
					sx={{
						marginBottom: isMobile ? 3 : 0,
					}}
				>
					<TabList
						onChange={onChange}
						aria-label="Your Collection and Want List"
					>
						<Tab label="Collection" releaseType={ReleaseListType.Collection} />
						<Tab label="Want List" releaseType={ReleaseListType.WantList} />
					</TabList>
				</Box>
			)}
			<CollectionTabPanel type={ReleaseListType.Collection} />
			{!readOnly && <CollectionTabPanel type={ReleaseListType.WantList} />}
		</TabContext>
	);
};
