import { Typography, Button } from '@mui/material';
import {
	Accordion,
	AccordionSummary,
	MusicVideoContainer,
	EmbeddedMusicVideo,
	AccordionDetails,
} from '../../styles';
import { Video } from '../../../../helpers/types';

const MusicVideos = ({
	expanded,
	isLoading,
	musicVideos,
	handleChange,
}: {
	expanded: boolean;
	isLoading: boolean;
	musicVideos: Video[];
	handleChange: (
		panel: string,
	) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
}) => {
	const uris: string[] = [];

	return (
		<Accordion
			expanded={expanded}
			onChange={handleChange('musicVideo')}
			disabled={isLoading}
		>
			<AccordionSummary
				aria-controls="musicVideo-content"
				id="musicVideo-header"
			>
				<Typography variant="h6">Music Videos</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{musicVideos && musicVideos.length > 0 ? (
					musicVideos.map((video) => {
						if (!uris.includes(video.uri)) {
							uris.push(video.uri);
							return (
								<MusicVideoContainer key={video.uri}>
									<Typography variant="body1">
										<b>{video.title}</b>
									</Typography>
									{video.embed ? (
										<EmbeddedMusicVideo
											src={`https://www.youtube.com/embed/${
												video.uri.split('=')[1]
											}`}
											title={video.title}
										/>
									) : (
										<Button
											variant="outlined"
											onClick={() => window.open(video.uri, '_blank')}
										>
											Watch Video
										</Button>
									)}
								</MusicVideoContainer>
							);
						}
						return null;
					})
				) : (
					<Typography variant="body1">There are no music videos.</Typography>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default MusicVideos;
