import { AlertColor } from '@mui/material';
import {
	AppReducerActions,
	ReleaseListType,
	SearchType,
	ViewType,
} from './enum';

export type MenuOptions = {
	label: string;
	onClick: () => void;
};

export type TableData = {
	title: string;
	artist: string;
	year: number;
	labels: string;
	genres: string;
	catno: string;
	releaseId: number;
};
export interface TableColumn {
	dataKey: keyof TableData;
	label: string;
	numeric?: boolean;
	width: string;
	sort?: 'ASC' | 'DESC' | null;
}

export type Record = {
	title: string;
	artist: string;
	year: number;
	labels: string;
	genres: string;
	catno: string;
	releaseId: number;
	image: string;
	instanceId: number;
};

export type GetUserCollectionResponse = {
	pagination: Pagination;
	releases: Release[];
};

export type Pagination = {
	items: number;
	page: number;
	pages: number;
};

export type Release = {
	id: number;
	instance_id: number;
	date_added: string;
	rating: number;
	basic_information: BasicInformation;
	folder_id: number;
	notes?: Note[];
};

export type BasicInformation = {
	id: number;
	master_id: number;
	master_url: string | null;
	resource_url: string;
	thumb: string;
	cover_image: string;
	title: string;
	year: number;
	formats: Format[];
	labels: Label[];
	artists: Artist[];
	genres: string[];
	styles: string[];
};

export type Format = {
	name: string;
	qty: string;
	descriptions?: string[];
	text?: string;
};

export type Label = {
	name: string;
	catno: string;
	entity_type: string;
	entity_type_name: string;
	id: number;
	resource_url: string;
};

export type Artist = {
	name: string;
	anv: string;
	join: string;
	role: string;
	tracks: string;
	id: number;
	resource_url: string;
};

export type Note = {
	field_id: number;
	value: string;
};

type Track = {
	position: string;
	title: string;
	duration: string;
};

type Image = {
	type: 'primary' | 'secondary';
	uri: string;
	resource_url: string;
	width: number;
	height: number;
};

export type ReleaseDetail = {
	id: number;
	artist: Artist[];
	labels: Label[];
	resource_url: string;
	master_id: number;
	master_url: string;
	title: string;
	genres: string[];
	tracklist: Track[];
	thumb: string;
	images: Image[];
};

export type AppStateType = {
	user: UserInfoType;
	collection: CollectionInfoType;
	currentRelease: UserCollectionItem;
	snackbar: SnackbarType;
	ui: UIStateType;
};

export type UIStateType = {
	viewType: ViewType;
	wantList: boolean;
	shareableLinkPopover: boolean;
};

export type SnackbarType = {
	message: string;
	open: boolean;
	severity: AlertColor;
};

export type UserInfoType = {
	id: number;
	username: string;
	resource_url: string;
	consumer_name: string;
};

export type CollectionInfoType = {
	value: string;
	numberOfItems: number;
	releases: UserCollectionItem[];
	wantList: UserCollectionItem[];
};

export type AppActionType =
	| UserInfoActionType
	| UserCollectionActionType
	| CurrentReleaseActionType
	| SetSnackbarActionType
	| RemoveReleaseActionType
	| AddReleaseActionType
	| UpdateViewActionType
	| ShowWantListActionType
	| ShowShareableLinkPopoverActionType;

export interface UserInfoActionType {
	type: AppReducerActions.UpdateUserInfo;
	user: UserInfoType;
}

export interface UpdateViewActionType {
	type: AppReducerActions.UpdateView;
	viewType: ViewType;
}

export interface ShowWantListActionType {
	type: AppReducerActions.ShowWantList;
	wantList: boolean;
}

export interface ShowShareableLinkPopoverActionType {
	type: AppReducerActions.ShowShareableLinkPopover;
	shareableLinkPopover: boolean;
}

export interface UserCollectionActionType {
	type: AppReducerActions.UpdateCollectionInfo;
	collection: CollectionInfoType;
}

export interface CurrentReleaseActionType {
	type: AppReducerActions.SetCurrentRelease;
	release: UserCollectionItem;
}

export interface SetSnackbarActionType {
	type: AppReducerActions.SetSnackbar;
	snackbar: SnackbarType;
}

export interface RemoveReleaseActionType {
	type: AppReducerActions.RemoveRelease;
	releaseId: number;
	list: ReleaseListType;
}

export interface AddReleaseActionType {
	type: AppReducerActions.AddRelease;
	release: UserCollectionItem;
}

export interface UserCollection {
	pages: number;
	items: UserCollectionItem[];
}

export interface UserCollectionItem {
	title: string;
	artist: string;
	year: number;
	labels: string;
	genres: string;
	catno: string;
	releaseId: number;
	imageUrl: string;
	instanceId: number;
	wantList?: boolean;
}

export interface ReleaseDetails {
	title: string;
	artist: string;
	genres: string;
	releaseDate: string;
	id: number;
	coverArtUri: string;
	labels: string;
	uri: string;
	year: number;
	trackList: ReleaseTrack[];
	musicVideos: Video[];
}

export interface Video {
	description: string;
	duration: number;
	embed: boolean;
	title: string;
	uri: string;
}

export interface ReleaseTrack {
	duration: string;
	position: string;
	title: string;
	featuredArtists: string;
}

export type ReleaseSearchType = keyof typeof SearchType;

export interface DatabaseSearchResponse {
	artist: string;
	title: string;
	year: number;
	labels: string;
	genres: string;
	imageUrl: string;
	catno: string;
	releaseId: number;
	country: string;
	inCollection: boolean;
	inWantlist: boolean;
}
