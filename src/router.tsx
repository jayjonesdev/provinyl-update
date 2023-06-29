import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './routes/Login';

export default createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);
