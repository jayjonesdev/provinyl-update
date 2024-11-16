import { useRecoilState, useRecoilValue } from 'recoil';
import {
	collectionState,
	releaseDialogState,
	uiState,
} from '../../helpers/atoms';
import { TabPanel } from '@mui/lab';
import { Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
import MobileGrid from './MobileGrid';
import { ReleaseListType, ViewType } from '../../helpers/enum';
import Fab from '../shared/FloatingActionButton';
import Table from './Table';
import Grid from './Grid';
import { UserCollectionItem } from '../../helpers/types';
import { useEffect } from 'react';

export default ({ type }: { type: ReleaseListType }) => {
	const { releases, wantList } = useRecoilValue(collectionState);
	const [{ viewType, readOnly, filteredData, currentTab }, setUiState] =
		useRecoilState(uiState);
	const [releaseDialog, setReleaseDialog] = useRecoilState(releaseDialogState);

	const onItemClick = (release: UserCollectionItem) => {
		setReleaseDialog({
			...releaseDialog,
			release,
			showReleaseDialog: true,
		});
	};

	useEffect(() => {
		setUiState((prev) => ({
			...prev,
			filteredData:
				currentTab === ReleaseListType.Collection ? releases : wantList,
		}));
	}, [releases, currentTab, wantList]);

	if (currentTab !== type) {
		return null;
	}

	if (filteredData.length === 0) {
		return <Typography variant="body1">There are no releases.</Typography>;
	}

	if (isMobile) {
		return (
			<>
				<MobileGrid data={filteredData} />
				{!readOnly && type !== ReleaseListType.WantList && <Fab />}
			</>
		);
	}

	return (
		<TabPanel value={type}>
			<div style={{ flexGrow: 1 }}>
				{viewType === ViewType.TABLE && (
					<Table data={filteredData} onItemClick={onItemClick} />
				)}
				{viewType === ViewType.GRID && (
					<Grid data={filteredData} onItemClick={onItemClick} />
				)}
			</div>
		</TabPanel>
	);
};
