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
			releaseId: basicInformation.id, // TODO: Check if it is id or master_id
		};
	});

const binaryHelper = <T extends { [k: string]: any }>(
	arr: Array<T>,
	element: T,
	lBound: number,
	uBound: number,
	iteratee: string,
): Array<T> => {
	if (uBound - lBound === 1) {
		// binary search ends, we need to insert the element around here
		if (element < arr[lBound]) return arr.splice(lBound, 0, element);
		else if (element > arr[uBound]) return arr.splice(uBound + 1, 0, element);
		else return arr.splice(uBound, 0, element);
	} else {
		// we look for the middle point
		const midPoint = Math.floor((uBound - lBound) / 2) + lBound;
		// depending on the value in the middle, we repeat the operation only on one slice of the array, halving it each time
		if (element < arr[midPoint]) {
			return binaryHelper(arr, element, lBound, midPoint, iteratee);
		} else {
			return binaryHelper(arr, element, midPoint, uBound, iteratee);
		}
	}
};

export const binaryInsertion = <T extends { [k: string]: any }>(
	arr: Array<T>,
	element: T,
	iteratee: string,
): Array<T> => {
	return binaryHelper(arr, element, 0, arr.length - 1, iteratee);
};
