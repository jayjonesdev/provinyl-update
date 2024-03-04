import {
	Box,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormHelperText,
	Menu,
	MenuItem,
	Table,
	TableCell,
	TableHead,
	TableRow,
	styled,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
	LazyLoadImage,
	LazyLoadImageProps,
} from 'react-lazy-load-image-component';
import { IframeHTMLAttributes } from 'react';

export const StyledProvinylLogo = styled('img')`
	height: 50px;
	width: 50px;
	box-sizing: border-box;
	cursor: pointer;
`;

export const StyledMenuItem = styled(MenuItem)(
	({ theme }) => `
&:hover {
    background-color: ${theme.palette.secondary.light};
    color: white;
}
`,
);

export const StyledMenu = styled(Menu)`
	margin-top: 45px;
`;

export const StyledDialogTitle = styled(DialogTitle)(
	({ theme }) => `
background-color: ${theme.palette.primary.main};
color: ${theme.palette.text.secondary};
`,
);

export const StyledDialog = styled(Dialog)`
	border-radius: 5px;
`;

export const StyledDialogContent = styled(DialogContent)(
	({ theme }) => `
background-color: ${theme.palette.background.default};
`,
);

export const StyledDialogActions = styled(DialogActions)(
	({ theme }) => `
background-color: ${theme.palette.background.default};
`,
);

export const StyledDialogContentText = styled('div')(
	({ theme }) => `
color: ${theme.palette.text.primary};
padding-top: ${theme.spacing()};
display: flex;
flex-direction: column;
`,
);

export const StyledDivider = styled(Divider)(
	({ theme, orientation = 'horizontal' }) => `
background-color: ${theme.palette.primary.main};
height: ${orientation === 'horizontal' ? '2px' : 'auto'};
margin: ${orientation === 'horizontal' ? '.5em 0px .5em 0' : '20px 10px'};
width: ${orientation === 'horizontal' ? 'auto' : '2px'};
`,
);

export const InstagramLink = styled('div')`
	display: flex;
	align-items: center;
`;

export const Container = styled('div')<{ isMobile: boolean }>`
	padding: ${({ isMobile }) => (!isMobile ? '20px 35px' : '0 10px')};
`;

export const ButtonBar = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const StyledHelperText = styled(FormHelperText)(
	({ theme }) => `
color: ${theme.palette.text.primary};
font-weight: 600;
`,
);

export const SearchContainer = styled('div')`
	display: flex;
	margin-top: 15px;
	align-items: flex-start;
`;

export const StyledTableHead = styled(TableHead)(
	({ theme }) => `
background-color: ${theme.palette.secondary.light};
`,
);

export const StyledTable = styled(Table)`
	border-collapse: 'separate';
	table-layout: 'fixed';
`;

export const StyledTableRow = styled(TableRow)(
	({ theme }) => `
cursor: pointer;
&:hover > td {
	background-color: ${theme.palette.primary.main};
	color: #fff;
}
`,
);

export const StyledCell = styled(TableCell)(
	({ theme }) => `
font-weight: 500;
color: ${theme.palette.primary.main};
line-height: 1.25;
&:hover > td {
	color: #fff;
}
`,
);

export const SpinnerContainer = styled(Box)`
	display: flex;
	width: 100%;
	margin-top: 200px;
	justify-content: center;
	align-items: center;
`;

export const AlbumArtworkSpinnerContainer = styled(Box)`
	display: flex;
	width: 300px;
	height: 300px;
	justify-content: center;
	align-items: center;
`;

export const AlbumArtwork = styled((props: LazyLoadImageProps) => (
	<Card
		elevation={3}
		sx={{
			aspectRatio: '1/1',
			width: props.width ?? 300,
			height: props.height ?? 300,
		}}
	>
		<LazyLoadImage
			effect="blur"
			loading="lazy"
			width={props.width ?? 300}
			height={props.height ?? 300}
			{...props}
		/>
	</Card>
))`
	border-radius: 5px;
`;

// 300px is the width of the album artwork
export const GridContainer = styled('div')`
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const GridTile = styled('div')`
	margin-bottom: 15px;
	&:hover {
		cursor: pointer;
	}
`;

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

export const ReleaseDetailsContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin-left: 10px;
	flex: 1;
`;

export const ViewReleaseContainer = styled('div')`
	display: flex;
	flex-direction: row;
	min-height: 450px;
`;

export const StyledPopoverContent = styled('div')(({ theme }) => ({
	padding: theme.spacing(),
}));

export const AddMenuSlotProps = {
	paper: {
		elevation: 1,
		sx: {
			overflow: 'visible',
			filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
			mt: 1.5,
			'& .MuiAvatar-root': {
				width: 32,
				height: 32,
				ml: -0.5,
				mr: 1,
			},
			'&:before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				bottom: 0,
				right: 14,
				width: 10,
				height: 10,
				bgcolor: 'background.paper',
				transform: 'translateY(50%) rotate(45deg)',
				zIndex: 0,
			},
		},
	},
};

export const FabContainer = styled('div')`
	position: fixed;
	bottom: 0;
	right: 0;
	padding: 10px;
	z-index: 101;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	background-image: -webkit-linear-gradient(
		top,
		rgba(60, 60, 60, 0) 0%,
		rgba(60, 60, 60, 0.3) 25%,
		rgba(60, 60, 60, 0.5) 50%,
		rgba(60, 60, 60, 0.7) 70%,
		rgba(60, 60, 60, 1) 100%
	);
`;
