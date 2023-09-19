import { UserCollectionItem } from '../../helpers/types';
import { AlbumArtwork, GridContainer, GridTile } from './styles';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';

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
				<AlbumArtwork src={item.imageUrl} scrollPosition={scrollPosition} />
			</GridTile>
		))}
	</GridContainer>
);

export default trackWindowScroll(Grid);
