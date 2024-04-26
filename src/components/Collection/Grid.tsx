/* eslint-disable react/prop-types */
import { DetailedHTMLProps, Suspense, forwardRef } from 'react';
import { UserCollectionItem } from '../../helpers/types';
import { GridContainer } from './styles';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
import LazyAlbumArtwork from '../shared/LazyAlbumArtwork';
import { GridTile } from '../shared/styles';
import { GridComponents, GridListProps, VirtuosoGrid } from 'react-virtuoso';
import { Paper } from '@mui/material';

const Grid = ({
	data,
	onItemClick,
}: {
	data: UserCollectionItem[];
	onItemClick: (item: UserCollectionItem) => void;
}) => {
	const VirtuosoGridComponents: GridComponents<UserCollectionItem> = {
		List: forwardRef((props, ref) => (
			<GridContainer {...props} ref={ref}>
				{props.children}
			</GridContainer>
		)),
		Item: GridTile,
	};

	return (
		<VirtuosoGrid
			style={{
				height: screen.height * 0.75,
			}}
			totalCount={100000}
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
							// scrollPosition={scrollPosition}
							placeholderSrc={PLACEHOLDER_IMG_SRC}
						/>
					</Suspense>
				);
			}}
		/>
	);
};

export default Grid;
