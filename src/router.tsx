import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Collection from './components/Collection';
import Search from './components/Search';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isMobile } from 'react-device-detect';
import Redirect from './Redirect';

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
		element: isMobile ? <Search /> : <Redirect to="/collection" />,
	},
]);
