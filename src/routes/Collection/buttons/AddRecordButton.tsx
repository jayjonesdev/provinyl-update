import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AddReleaseDialog from '../AddReleaseDialog';

export default () => {
	const [showDialog, setShowDialog] = useState(false);
	const toggleDialog = () => setShowDialog(!showDialog);

	return (
		<>
			<Button
				variant="contained"
				size="large"
				onClick={toggleDialog}
				startIcon={<Add />}
			>
				Add {!isMobile && 'Record'}
			</Button>
			<AddReleaseDialog open={showDialog} handleClose={toggleDialog} />
		</>
	);
};
