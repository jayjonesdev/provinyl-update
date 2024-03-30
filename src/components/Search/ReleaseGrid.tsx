import { Suspense } from 'react';
import { DatabaseSearchResponse } from '../../helpers/types';
import {
	ScrollPosition,
	trackWindowScroll,
} from 'react-lazy-load-image-component';
import { PLACEHOLDER_IMG_SRC } from '../../helpers/constants';
import { Button, Card } from '@mui/material';
import { Info } from '@mui/icons-material';
import LazyAlbumArtwork from '../shared/LazyAlbumArtwork';
import { GridTile } from '../shared/styles';

const ReleaseGrid = ({
	data,
	scrollPosition,
	add,
}: {
	data: DatabaseSearchResponse[];
	scrollPosition: ScrollPosition;
	add: (release: DatabaseSearchResponse) => void;
}) => {
	const viewDiscogsPage = (item: DatabaseSearchResponse) =>
		window.open(`https://www.discogs.com/release/${item.releaseId}`, '_blank');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{data.map((item) => (
				<GridTile key={item.releaseId}>
					<Suspense fallback={<img src={PLACEHOLDER_IMG_SRC} />}>
						<LazyAlbumArtwork
							src={item.imageUrl}
							aria-label={`${item.artist} - ${item.title}`}
							alt={`${item.artist} - ${item.title}`}
							scrollPosition={scrollPosition}
							placeholderSrc={PLACEHOLDER_IMG_SRC}
							width={window.innerWidth - 30}
							height={window.innerWidth - 30}
							onClick={() => viewDiscogsPage(item)}
						/>
					</Suspense>
					<Card
						elevation={3}
						style={{
							backgroundColor: 'white',
							borderRadius: '0 0 5px 5px',
							height: 70,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'relative',
							top: -5,
							zIndex: 0,
							paddingRight: 15,
							paddingLeft: 15,
						}}
					>
						<Button
							fullWidth
							variant="outlined"
							style={{
								height: 35,
								marginTop: 10,
								marginRight: 10,
							}}
							onClick={() => add(item)}
						>
							Add
						</Button>
						<Info
							fontSize="large"
							style={{ marginTop: 5 }}
							onClick={() => viewDiscogsPage(item)}
						/>
					</Card>
				</GridTile>
			))}
		</div>
	);
};

export default trackWindowScroll(ReleaseGrid);
