import axios from 'axios';
import Cookies from 'js-cookie';
import { ReleaseDetails, UserCollection, UserInfoType } from '../helpers/types';

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

export const getUserCollectionValue = async (
	username: string,
): Promise<string> => api(`/user/${username}/collection/value`);

export const getUserInfo = async (): Promise<UserInfoType> => api('/user/info');

// Auth Routes
export const login = () => {
	window.location.href = `${
		process.env.REACT_APP_SERVICES_URL
	}/auth/discogs/${Math.floor(Math.random() * 1000)}`;
};

// Release Routes
export const getReleaseDetails = (id: number): Promise<ReleaseDetails> =>
	api(`/release/details/${id}`);
