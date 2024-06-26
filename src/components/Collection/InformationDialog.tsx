import { Button, IconButton, Typography } from '@mui/material';
import {
	InstagramLink,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	StyledDialogContentText,
	StyledDialogTitle,
} from './styles';
import { Instagram } from '@mui/icons-material';
import { INSTAGRAM_LINK } from '../../helpers/constants';
import { StyledDivider } from '../shared/styles';

export default ({
	open,
	value,
	numOfItems,
	handleClose,
}: {
	open: boolean;
	value: string;
	numOfItems: string;
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
			<StyledDialogContent>
				<StyledDialogContentText>
					<Typography variant="body1">
						<b># of items in your collection: </b>
						{numOfItems}
					</Typography>
					<Typography variant="body1">
						<b>Collection value in USD: </b>
						{value}
					</Typography>
					<StyledDivider />
					<InstagramLink>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="instagram-link"
							onClick={() => window.open(INSTAGRAM_LINK, '_blank')}
						>
							<Instagram />
						</IconButton>
						<Typography variant="body2">Visit us on Instagram</Typography>
					</InstagramLink>
					<Typography variant="subtitle2">
						<i>
							This application uses Discogs&#39; API but is not affiliated with,
							sponsored or endorsed by Discogs. &#39;Discogs&#39; is a trademark
							of Zink Media, LLC.
						</i>
					</Typography>
				</StyledDialogContentText>
			</StyledDialogContent>
			<StyledDialogActions>
				<Button onClick={handleClose} variant="contained">
					Close
				</Button>
			</StyledDialogActions>
		</StyledDialog>
	);
};
