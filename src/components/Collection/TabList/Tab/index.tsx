import { Tab, Typography } from '@mui/material';
import { ReleaseListType } from '../../../../helpers/enum';

export default ({
	label,
	releaseType,
}: {
	label: string;
	releaseType: ReleaseListType;
}) => {
	return (
		<Tab
			label={
				<Typography variant="body1" fontWeight={500}>
					{label}
				</Typography>
			}
			value={releaseType}
		/>
	);
};
