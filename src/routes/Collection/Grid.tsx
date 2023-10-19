import { Suspense, lazy } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import { GridContainer, GridTile } from './styles';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
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
				<Suspense fallback={<img src={PLACEHOLDER_IMG_SRC} />}>
					<LazyAlbumArtwork
						src={item.imageUrl}
						scrollPosition={scrollPosition}
						placeholderSrc={PLACEHOLDER_IMG_SRC}
					/>
				</Suspense>
			</GridTile>
		))}
	</GridContainer>
);

export default trackWindowScroll(Grid);
