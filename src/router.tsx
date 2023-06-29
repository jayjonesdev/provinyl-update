import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './routes/Login';
import Collection from './routes/Collection';

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
]);
