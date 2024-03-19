import { FileCopy } from '@mui/icons-material';
import { Popover, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import { AppReducerActions } from '../../helpers/enum';
import { DISCOGS_PRIVACY_POLICY } from '../../helpers/constants';
import { StyledPopoverContent } from './styles';

export default ({
	anchor,
	open,
	onClose,
}: {
	anchor: HTMLElement | null;
	open: boolean;
	onClose: () => void;
}) => {
	const {
		user: { username },
	} = useAppState();
	const dispatch = useAppDispatch();
	const USER_COLLECTION_LINK = `${process.env.REACT_APP_CLIENT_URL}/user/collection/${username}`;

	const copyShareableLink = () => {
		navigator.clipboard.writeText(USER_COLLECTION_LINK);
		dispatch({
			type: AppReducerActions.SetSnackbar,
			snackbar: {
				severity: 'success',
				message: 'Link successfully copied.',
				open: true,
			},
		});
		onClose();
	};

	return (
		<Popover
			anchorEl={anchor}
			open={open}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			style={{ height: 400 }}
		>
			<StyledPopoverContent>
				<TextField
					fullWidth
					InputProps={{
						readOnly: true,
						endAdornment: (
							<FileCopy
								style={{ cursor: 'pointer' }}
								onClick={copyShareableLink}
							/>
						),
					}}
					margin="dense"
					color="secondary"
					variant="outlined"
					value={USER_COLLECTION_LINK}
				/>
				<Typography variant="body2">
					To share your collection, please login into Discogs and follow these
					steps... <br />
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={DISCOGS_PRIVACY_POLICY}
						style={{ textDecoration: 'none' }}
					>
						Account -&gt; Settings -&gt; Privacy -&gt;{' '}
						<b>Allow others to browse my collection.</b> (Click here)
					</a>
				</Typography>
			</StyledPopoverContent>
		</Popover>
	);
};
