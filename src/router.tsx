import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './routes/Login';
import Collection from './routes/Collection';
import Search from './routes/Search';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isMobile } from 'react-device-detect';

export default createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/collection',
		element: <Collection />,
	},
	{
		path: '/user/collection/:username',
		element: <Collection readOnly />,
	},
	{
		path: '/collection/search/:searchType',
		element: isMobile ? <Search /> : <Collection />,
	},
]);
