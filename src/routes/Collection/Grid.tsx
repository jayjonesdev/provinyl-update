import { CircularProgress } from '@mui/material';
import { UserCollectionItem } from '../../helpers/types';
import {
	AlbumArtwork,
	GridContainer,
	GridTile,
	SpinnerContainer,
} from './styles';

export default ({
	data,
	onItemClick,
}: {
	data: UserCollectionItem[];
	onItemClick: (item: UserCollectionItem) => void;
}) => (
	<GridContainer>
		{data.map((item) => (
			<GridTile key={item.instanceId} onClick={() => onItemClick(item)}>
				<AlbumArtwork
					src={item.imageUrl}
					placeholder={
						<SpinnerContainer>
							<CircularProgress />
						</SpinnerContainer>
					}
				/>
			</GridTile>
		))}
	</GridContainer>
);
