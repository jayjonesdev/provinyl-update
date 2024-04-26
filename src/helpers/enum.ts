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
	UpdateCollection = 'UPDATE_COLLECTION',
	SetCurrentRelease = 'SET_CURRENT_RELEASE',
	RemoveRelease = 'REMOVE_RELEASE',
	AddRelease = 'ADD_RELEASE',
	UpdateView = 'UPDATE_VIEW',
	ToggleWantList = 'TOGGLE_WANT_LIST',
	ToggleShareableLinkPopover = 'TOGGLE_SHAREABLE_LINK_POPOVER',
}

export enum ReleaseListType {
	Collection = 'COLLECTION',
	WantList = 'WANT_LIST',
}
