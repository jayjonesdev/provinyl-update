import axios from 'axios';
import Cookies from 'js-cookie';

export const login = () => {
	window.location.href = `${
		process.env.REACT_APP_SERVICES_URL
	}/auth/discogs/${Math.floor(Math.random() * 1000)}`;
};

// export const getUserCollection = async () =>
// 	await axios.get(`${process.env.REACT_APP_SERVICES_URL}/userCollection`, {
// 		headers: {
// 			Authorization: Cookies.get(`${process.env.REACT_APP_LOGIN_COOKIE}`),
// 		},
// 	});
