import { Suspense, lazy } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import { GridTile } from './styles';
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
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}
	>
		{data.map((item) => (
			<GridTile
				key={item.instanceId}
				onClick={() =>
					window.open(
						`https://www.discogs.com/release/${item.releaseId}`,
						'_blank',
					)
				}
			>
				<Suspense fallback={<img src={PLACEHOLDER_IMG_SRC} />}>
					<LazyAlbumArtwork
						src={item.imageUrl}
						aria-label={`${item.artist} - ${item.title}`}
						alt={`${item.artist} - ${item.title}`}
						scrollPosition={scrollPosition}
						placeholderSrc={PLACEHOLDER_IMG_SRC}
						width={window.innerWidth - 30}
						height={window.innerWidth - 30}
					/>
				</Suspense>
			</GridTile>
		))}
	</div>
);

export default trackWindowScroll(Grid);
