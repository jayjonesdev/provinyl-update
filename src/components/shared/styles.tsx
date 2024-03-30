import { Card, styled } from '@mui/material';
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
