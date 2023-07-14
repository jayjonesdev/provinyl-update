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
};
export interface TableColumn {
	dataKey: keyof TableData;
	label: string;
	numeric?: boolean;
	width: number;
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
