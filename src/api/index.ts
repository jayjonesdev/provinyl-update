import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import rateLimit from 'axios-rate-limit';

const personalApi = axios.create({ baseURL: 'https://api.discogs.com' });

// TODO: request error handling
// personalApi.interceptors.request.use(authorizeRequest);

personalApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		switch (error.response.status) {
			case 401:
				Cookies.remove(`${process.env.REACT_APP_LOGIN_COOKIE}`);
				break;
			default:
				break;
		}
		return await Promise.reject(error);
	}
);

const rateLimitPersonalApi = rateLimit(personalApi, { maxRPS: 1 });

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVICES_URL}`,
    withCredentials: true
});


export const authorizeRequest = (request: InternalAxiosRequestConfig) => {
// request.headers!.setAuthorization('BOB');
	return {
		...request,
		headers: {
			...request.headers,
			'Authorization': 'BOB'
		}
	}
}
// api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
// 	// req.headers.Authorization = Cookies.get(`${process.env.REACT_APP_LOGIN_COOKIE}`);
// 	return {
// 		...req,
// 		headers: {
// 			...req.headers,
// 			Authorization: Cookies.get(`${process.env.REACT_APP_LOGIN_COOKIE}`)
// 		}
// 	};
//   });

// api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
// 	// request.headers!.setAuthorization('BOB');
// 		return {
// 			...request,
// 			headers: {
// 				...request.headers,
// 				'Authorization': 'BOB'
// 			}
// 		}
// 	});


export default api;