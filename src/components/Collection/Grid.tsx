/* eslint-disable react/prop-types */
import { Suspense, forwardRef } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import { GridContainer } from './styles';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
import LazyAlbumArtwork from '../shared/LazyAlbumArtwork';
import { GridTile } from '../shared/styles';
import { GridComponents, VirtuosoGrid } from 'react-virtuoso';

const VirtuosoGridComponents: GridComponents<UserCollectionItem> = {
	List: forwardRef((props, ref) => (
		<GridContainer {...props} ref={ref}>
			{props.children}
		</GridContainer>
	)),
	Item: (props) => <GridTile {...props} />,
};

const Grid = ({
	data,
	onItemClick,
}: {
	data: UserCollectionItem[];
	onItemClick: (item: UserCollectionItem) => void;
}) => {
	return (
		<VirtuosoGrid
			style={{
				height: screen.height * 0.75,
			}}
			totalCount={data.length}
			components={VirtuosoGridComponents}
			itemContent={(index) => {
				const item = data[index];
				return (
					<Suspense fallback={<img src={PLACEHOLDER_IMG_SRC} />}>
						<LazyAlbumArtwork
							key={item.instanceId}
							onClick={() => onItemClick(item)}
							src={item.imageUrl}
							aria-label={`${item.artist} - ${item.title}`}
							alt={`${item.artist} - ${item.title}`}
							placeholderSrc={PLACEHOLDER_IMG_SRC}
						/>
					</Suspense>
				);
			}}
		/>
	);
};

export default Grid;
