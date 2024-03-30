import { Link } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import ShareableLinkPopover from '../Collection/ShareableLinkPopover';
import { useState } from 'react';

export default () => {
	const [showPopover, setShowPopover] = useState(false);
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);

	const togglePopover = () => setShowPopover(!showPopover);
	const openPopover = (event: React.MouseEvent<HTMLElement>) => {
		setAnchor(event.currentTarget);
		togglePopover();
	};

	return (
		<>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="link"
				sx={{ mr: 2 }}
				onClick={openPopover}
			>
				<Link fontSize="large" />
			</IconButton>
			<ShareableLinkPopover
				open={showPopover}
				onClose={togglePopover}
				anchor={anchor}
			/>
		</>
	);
};
