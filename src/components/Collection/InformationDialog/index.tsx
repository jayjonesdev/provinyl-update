import { Button } from '@mui/material';
import {
	StyledDialog,
	StyledDialogTitle,
	StyledDialogActions,
} from '../styles';
import Content from './Content';

export default ({
	open,
	handleClose,
}: {
	open: boolean;
	handleClose: () => void;
}) => {
	return (
		<StyledDialog
			open={open}
			keepMounted
			onClose={handleClose}
			aria-describedby="information-dialog"
			fullWidth
		>
			<StyledDialogTitle>Information</StyledDialogTitle>
			<Content />
			<StyledDialogActions>
				<Button onClick={handleClose} variant="contained">
					Close
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
