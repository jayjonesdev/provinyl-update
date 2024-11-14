import { styled } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { IframeHTMLAttributes } from 'react';

export const Accordion = styled((props: AccordionProps) => (
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

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
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

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
	overflow: 'scroll',
	position: 'relative',
	maxHeight: '400px',
}));

export const MusicVideoContainer = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const EmbeddedMusicVideo = styled(
	(props: IframeHTMLAttributes<HTMLElement>) => (
		<iframe
			allow="encrypted-media; picture-in-picture;"
			allowFullScreen
			loading="lazy"
			{...props}
		/>
	),
)`
	aspect-ratio: 16/9;
`;
