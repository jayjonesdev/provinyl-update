import { Suspense, lazy } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import {
	AlbumArtworkSpinnerContainer,
	GridContainer,
	GridTile,
} from './styles';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { CircularProgress } from '@mui/material';
const LazyAlbumArtwork = lazy(() =>
	import('./styles').then((module) => ({ default: module.AlbumArtwork })),
);
const Grid = ({
	data,
	scrollPosition,
	onItemClick,
}: {
	data: UserCollectionItem[];
	scrollPosition: ScrollPosition;
	onItemClick: (item: UserCollectionItem) => void;
}) => (
	<GridContainer>
		{data.map((item) => (
			<GridTile key={item.instanceId} onClick={() => onItemClick(item)}>
				<Suspense
					fallback={
						// TODO: Have spinner overlay img, store image in assets folder
						<AlbumArtworkSpinnerContainer>
							<CircularProgress />
							<img src="https://www.tehlin.com/public/images/images-empty.png" />
						</AlbumArtworkSpinnerContainer>
					}
				>
					<LazyAlbumArtwork
						src={item.imageUrl}
						scrollPosition={scrollPosition}
					/>
				</Suspense>
			</GridTile>
		))}
	</GridContainer>
);

export default trackWindowScroll(Grid);
