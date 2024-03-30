import { Typography } from '@mui/material';

export default ({ title, desc }: { title: string; desc: string | number }) => (
	<Typography variant="body1">
		<b>{title}:</b> {desc}
	</Typography>
);
