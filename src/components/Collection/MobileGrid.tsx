import { Suspense } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
import LazyAlbumArtwork from '../shared/LazyAlbumArtwork';
import { GridTile } from '../shared/styles';

const MobileGrid = ({
	data,
	scrollPosition,
}: {
	data: UserCollectionItem[];
	scrollPosition: ScrollPosition;
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
				style={{ marginBottom: '15px' }}
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

export default trackWindowScroll(MobileGrid);
