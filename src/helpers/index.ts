import { type Release, type TableData } from './types';

export const removeDiacritics = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

export const getTableData = (data: Release[]): TableData[] =>
	data.map((release) => {
		const { basic_information: basicInformation } = release;
		const labels = new Set<string>();
		const catnos = new Set<string>();

		basicInformation.labels.forEach((label) => {
			labels.add(label.name);
			catnos.add(label.catno);
		});

		return {
			title: basicInformation.title,
			artist: basicInformation.artists
				.reduce((artists, artist) => `${artists}, ${artist.name}`, '')
				.slice(1),
			year: basicInformation.year,
			labels: [...new Set(labels)].join(', '),
			genres: basicInformation.genres.join(', '),
			catno: [...new Set(catnos)].join(', '),
		};
	});
