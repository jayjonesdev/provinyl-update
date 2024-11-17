import { Instagram } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import { INSTAGRAM_LINK } from '../../../helpers/constants';
import { StyledDivider } from '../../shared/styles';
import {
	StyledDialogContent,
	StyledDialogContentText,
	InstagramLink,
} from '../styles';
import { useRecoilValue } from 'recoil';
import { collectionState } from '../../../helpers/atoms';

export default () => {
	const { value, numOfItems } = useRecoilValue(collectionState);

	return (
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
	);
};
