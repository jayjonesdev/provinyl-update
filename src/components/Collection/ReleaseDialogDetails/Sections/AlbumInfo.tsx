import { Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '../../styles';
import { UserCollectionItem } from '../../../../helpers/types';
import Detail from '../../Detail';

const AlbumInfo = ({
	expanded,
	release,
	handleChange,
}: {
	expanded: boolean;
	release: UserCollectionItem;
	handleChange: (
		panel: string,
	) => (_event: React.SyntheticEvent, newExpanded: boolean) => void;
}) => (
	<Accordion expanded={expanded} onChange={handleChange('albumInfo')}>
		<AccordionSummary aria-controls="albumInfo-content" id="albumInfo-header">
			<Typography variant="h6">Album Information</Typography>
		</AccordionSummary>
		<AccordionDetails>
			<Detail title="Artist" desc={release.artist} />
			<Detail title="Title" desc={release.title} />
			<Detail title="Year" desc={release.year === 0 ? 'N/A' : release.year} />
			<Detail title="Labels" desc={release.labels} />
			<Detail title="Genres" desc={release.genres} />
			<Detail title="Catalog #" desc={release.catno} />
			<Typography variant="subtitle2" style={{ marginTop: 10 }}>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://www.discogs.com/release/${release.releaseId}`}
				>
					View release on Discogs.
				</a>
			</Typography>
		</AccordionDetails>
	</Accordion>
);

export default AlbumInfo;
