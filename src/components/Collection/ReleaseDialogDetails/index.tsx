import { useState, SyntheticEvent } from 'react';
import { ReleaseDetailsContainer } from '../styles';
import { useRecoilValue } from 'recoil';
import { releaseDialogState } from '../../../helpers/atoms';
import MusicVideos from './Sections/MusicVideos';
import TrackList from './Sections/TrackList';
import AlbumInfo from './Sections/AlbumInfo';

export default ({ isLoading }: { isLoading: boolean }) => {
	const [expanded, setExpanded] = useState<string | false>('albumInfo');
	const { release, releaseDetails } = useRecoilValue(releaseDialogState);

	const handleChange =
		(panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
			setExpanded(newExpanded ? panel : false);
		};

	return (
		<ReleaseDetailsContainer>
			<AlbumInfo
				expanded={expanded === 'albumInfo'}
				release={release}
				handleChange={handleChange}
			/>
			<TrackList
				expanded={expanded === 'trackList'}
				handleChange={handleChange}
				isLoading={isLoading}
				trackList={releaseDetails.trackList}
			/>
			<MusicVideos
				expanded={expanded === 'musicVideo'}
				handleChange={handleChange}
				isLoading={isLoading}
				musicVideos={releaseDetails.musicVideos}
			/>
		</ReleaseDetailsContainer>
	);
};
