import { Alert, Snackbar } from '@mui/material';
import { SnackbarType } from '../../helpers/types';

export default ({
	message,
	open,
	severity,
	onClose,
}: SnackbarType & { onClose: () => void }) => (
	<Snackbar
		open={open}
		autoHideDuration={6000}
		onClose={onClose}
		anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
	>
		<Alert
			onClose={onClose}
			severity={severity}
			variant="filled"
			sx={{ width: '100%' }}
		>
			{message}
		</Alert>
	</Snackbar>
);
