import { Box, Card, Divider, styled } from '@mui/material';
import {
	LazyLoadImageProps,
	LazyLoadImage,
} from 'react-lazy-load-image-component';

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

export const SpinnerContainer = styled(Box)`
	display: flex;
	width: 100%;
	margin-top: 200px;
	justify-content: center;
	align-items: center;
`;

export const GridTile = styled('div')`
	margin-bottom: 15px;
	&:hover {
		cursor: pointer;
	}
`;

export const StyledDivider = styled(Divider)(
	({ theme, orientation = 'horizontal' }) => `
background-color: ${theme.palette.primary.main};
height: ${orientation === 'horizontal' ? '2px' : 'auto'};
margin: ${orientation === 'horizontal' ? '.5em 0px .5em 0' : '20px 10px'};
width: ${orientation === 'horizontal' ? 'auto' : '2px'};
`,
);
