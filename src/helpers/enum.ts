export enum ViewType {
	GRID = 'GRID',
	TABLE = 'TABLE',
}

export enum SearchType {
	CATALOG_NUMBER = 'Catalog No.',
	BARCODE = 'Barcode',
	ALBUM_TITLE = 'Album Title',
	ARTIST = 'Artist',
	TRACK = 'Track',
}

export enum AppReducerActions {
	UpdateUserInfo = 'UPDATE_USER_INFO',
	UpdateCollectionInfo = 'UPDATE_COLLECTION_INFO',
	SetCurrentRelease = 'SET_CURRENT_RELEASE',
	SetSnackbar = 'SET_SNACKBAR',
	RemoveRelease = 'REMOVE_RELEASE',
	AddRelease = 'ADD_RELEASE',
	UpdateView = 'UPDATE_VIEW',
	ShowWantList = 'SHOW_WANT_LIST',
}
