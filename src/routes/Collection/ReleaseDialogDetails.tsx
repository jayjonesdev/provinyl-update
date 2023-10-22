import * as React from 'react';
import Typography from '@mui/material/Typography';
import { ReleaseDetails } from '../../helpers/types';
import { useAppState } from '../../helpers/hooks/useAppState';
import { Button } from '@mui/material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	EmbeddedMusicVideo,
	MusicVideoContainer,
	ReleaseDetailsContainer,
} from './styles';
import Detail from './Detail';

export default ({
	releaseDetails,
	isLoading,
}: {
	releaseDetails: ReleaseDetails;
	isLoading: boolean;
}) => {
	const [expanded, setExpanded] = React.useState<string | false>('albumInfo');
	const { currentRelease: release } = useAppState();

	const handleChange =
		(panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
			setExpanded(newExpanded ? panel : false);
		};

	return (
		<ReleaseDetailsContainer>
			<Accordion
				expanded={expanded === 'albumInfo'}
				onChange={handleChange('albumInfo')}
			>
				<AccordionSummary
					aria-controls="albumInfo-content"
					id="albumInfo-header"
				>
					<Typography variant="h6">Album Information</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Detail title="Artist" desc={release.artist} />
					<Detail title="Title" desc={release.title} />
					<Detail
						title="Year"
						desc={release.year === 0 ? 'N/A' : release.year}
					/>
					<Detail title="Labels" desc={release.labels} />
					<Detail title="Genres" desc={release.genres} />
					<Detail title="Catalog #" desc={release.catno} />
					<Typography variant="subtitle2" style={{ marginTop: 10 }}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://www.discogs.com/release/${release.releaseId}`}
						>
							View release on Discogs.
						</a>
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'trackList'}
				onChange={handleChange('trackList')}
				disabled={isLoading}
			>
				<AccordionSummary
					aria-controls="trackList-content"
					id="trackList-header"
				>
					<Typography variant="h6">Track List</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{releaseDetails.trackList &&
						releaseDetails.trackList.map((track, index) => {
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
			<Accordion
				expanded={expanded === 'musicVideo'}
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
					{releaseDetails.musicVideos ? (
						releaseDetails.musicVideos.map((video) => {
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
						})
					) : (
						<Typography variant="body1">There are no music videos.</Typography>
					)}
				</AccordionDetails>
			</Accordion>
		</ReleaseDetailsContainer>
	);
};
