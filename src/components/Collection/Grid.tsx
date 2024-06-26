import { Suspense } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import { GridContainer } from './styles';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
import LazyAlbumArtwork from '../shared/LazyAlbumArtwork';
import { GridTile } from '../shared/styles';

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
						aria-label={`${item.artist} - ${item.title}`}
						alt={`${item.artist} - ${item.title}`}
						scrollPosition={scrollPosition}
						placeholderSrc={PLACEHOLDER_IMG_SRC}
					/>
				</Suspense>
			</GridTile>
		))}
	</GridContainer>
);

export default trackWindowScroll(Grid);
