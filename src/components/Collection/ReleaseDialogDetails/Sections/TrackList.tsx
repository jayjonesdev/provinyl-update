import { Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '../../styles';
import { ReleaseTrack } from '../../../../helpers/types';

const TrackList = ({
	expanded,
	isLoading,
	trackList,
	handleChange,
}: {
	expanded: boolean;
	isLoading: boolean;
	trackList: ReleaseTrack[];
	handleChange: (
		panel: string,
	) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
}) => (
	<Accordion
		expanded={expanded}
		onChange={handleChange('trackList')}
		disabled={isLoading}
	>
		<AccordionSummary aria-controls="trackList-content" id="trackList-header">
			<Typography variant="h6">Track List</Typography>
		</AccordionSummary>
		<AccordionDetails>
			{trackList &&
				trackList.map((track, index) => {
					const duration =
						track.duration.length > 0 ? ` - ${track.duration}` : '';
					const featuringArtists = track.featuredArtists;
					const featuring =
						featuringArtists.length > 0 ? ` - ft. ${featuringArtists}` : '';

					return (
						<Typography key={index} variant="body1">
							<b>{track.position}.</b> {track.title}
							{duration}
							{featuring}
						</Typography>
					);
				})}
		</AccordionDetails>
	</Accordion>
);

export default TrackList;
