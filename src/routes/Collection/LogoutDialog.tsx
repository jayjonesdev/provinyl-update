import { Button, Typography } from '@mui/material';
import {
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogContentText,
	StyledDialogTitle,
} from './styles';

export default ({
	open,
	handleClose,
	handleAction,
}: {
	open: boolean;
	handleClose: () => void;
	handleAction: () => void;
}) => {
	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={handleClose}
			aria-describedby="logout-dialog"
			fullWidth
		>
			<StyledDialogTitle>Logout</StyledDialogTitle>
			<StyledDialogContent>
				<StyledDialogContentText>
					<Typography variant="body1">
						Are you sure you want to logout?
					</Typography>
				</StyledDialogContentText>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button onClick={handleAction} variant="contained">
					Logout
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
