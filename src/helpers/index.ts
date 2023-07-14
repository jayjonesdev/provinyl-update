export const removeDiacritics = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();
