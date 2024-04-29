import { atom } from 'recoil';
import {
	Release,
	ReleaseDetails,
	UserCollectionItem,
	UserInfoType,
} from './types';
import { ReleaseListType, ViewType } from './enum';

export const loadingProgressState = atom({
	key: 'loadingProgressState', // unique ID (with respect to other atoms/selectors)
	default: 0, // default value (aka initial value)
});

export const collectionState = atom({
	key: 'collectionState',
	default: {
		releases: [] as UserCollectionItem[],
		wantList: [] as UserCollectionItem[],
		value: '',
		numOfItems: 0,
	},
});

export const uiState = atom({
	key: 'uiState',
	default: {
		viewType: ViewType.GRID,
		readOnly: false,
		filteredData: [] as UserCollectionItem[],
		currentTab: ReleaseListType.Collection,
		showLoadingPopup: true,
	},
});

export const userInfoState = atom({
	key: 'userInfoState',
	default: {
		id: 0,
		username: '',
		resource_url: '',
		consumer_name: '',
	} as UserInfoType,
});

export const releaseDialogState = atom({
	key: 'releaseDialogState',
	default: {
		release: {} as UserCollectionItem,
		releaseDetails: {} as ReleaseDetails,
		showReleaseDialog: false,
	},
});
