import { lazy } from 'react';

export default lazy(() =>
	import('./styles').then((module) => ({ default: module.AlbumArtwork })),
);
