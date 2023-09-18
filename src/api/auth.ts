export const login = () => {
	window.location.href = `${
		process.env.REACT_APP_SERVICES_URL
	}/auth/discogs/${Math.floor(Math.random() * 1000)}`;
};
