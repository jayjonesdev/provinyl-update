import axios from 'axios';
import Cookies from 'js-cookie';
import {
	DatabaseSearchResponse,
	ReleaseDetails,
	ReleaseSearchType,
	UserCollection,
	UserCollectionItem,
	UserInfoType,
} from '../helpers/types';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_SERVICES_URL}`,
	withCredentials: true,
	headers: {
		Authorization: Cookies.get(`${process.env.REACT_APP_LOGIN_COOKIE}`),
	},
});

api.interceptors.response.use((response) => response.data);

// User Routes
export const getUserCollection = async (
	username: string,
): Promise<UserCollection> => api(`/user/${username}/collection`);

export const getUserWantList = async (
	username: string,
): Promise<UserCollectionItem[]> => api(`/user/${username}/wantlist`);

export const getUserCollectionValue = async (
	username: string,
): Promise<string> => api(`/user/${username}/collection/value`);

export const getUserInfo = async (): Promise<UserInfoType> => api('/user/info');

export const removeReleaseFromCollection = async (
	username: string,
	releaseId: string,
	instanceId: string,
): Promise<UserCollection> =>
	api.delete(
		`/user/${username}/collection/release/${releaseId}/instance/${instanceId}`,
	);

export const addReleaseToCollection = async (
	username: string,
	releaseId: number,
): Promise<number> =>
	api.post(`/user/${username}/collection/release/${releaseId}`);

// Auth Routes
export const login = () => {
	window.location.href = `${
		process.env.REACT_APP_SERVICES_URL
	}/auth/discogs/${Math.floor(Math.random() * 1000)}`;
};

// Release Routes
export const getReleaseDetails = (id: number): Promise<ReleaseDetails> =>
	api(`/release/details/${id}`);

// Database Routes
export const searchDatabase = (
	query: string,
	type: ReleaseSearchType,
): Promise<DatabaseSearchResponse[]> =>
	api(`/database/search/${encodeURIComponent(query)}/type/${type}`);
