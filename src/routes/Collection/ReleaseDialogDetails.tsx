import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ReleaseDetails } from '../../helpers/types';
import { useAppState } from '../../helpers/hooks/useAppState';
import { Button } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: theme.palette.secondary.light,
	color: theme.palette.secondary.contrastText,
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-expandIconWrapper': {
		color: theme.palette.secondary.contrastText,
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Detail = ({ title, desc }: { title: string; desc: string | number }) => (
	<Typography variant="body1">
		<b>{title}:</b> {desc}
	</Typography>
);

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
		<div>
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
					<Detail title="Artists" desc={release.artist} />
					<Detail title="Title" desc={release.title} />
					<Detail
						title="Year"
						desc={release.year === 0 ? 'N/A' : release.year}
					/>
					<Detail title="Labels" desc={release.labels} />
					<Detail title="Genres" desc={release.genres} />
					<Detail title="Catalog #" desc={release.catno} />
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
				// style={{
				// 	height: expanded === 'musicVideo' ? '300px' : '64px',
				// }}
			>
				<AccordionSummary
					aria-controls="musicVideo-content"
					id="musicVideo-header"
				>
					<Typography variant="h6">Music Videos</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div
						style={{
							overflow: 'scroll',
							position: 'relative',
							height: '400px',
						}}
					>
						{releaseDetails.musicVideos ? (
							releaseDetails.musicVideos.map((video) => {
								return (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
										}}
										key={video.uri}
									>
										<Typography variant="body1">
											<b>{video.title}</b>
										</Typography>
										{video.embed ? (
											<iframe
												style={{ aspectRatio: '16/9' }}
												src={`https://www.youtube.com/embed/${
													video.uri.split('=')[1]
												}`}
												title={video.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowFullScreen
											/>
										) : (
											<Button
												variant="outlined"
												onClick={() => window.open(video.uri, '_blank')}
											>
												Watch Video
											</Button>
										)}
									</div>
								);
							})
						) : (
							<Typography variant="body1">
								There are no music videos.
							</Typography>
						)}
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
