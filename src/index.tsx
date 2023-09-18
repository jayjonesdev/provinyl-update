import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { AppContextProvider } from './AppContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

const Parent = ({ children }: { children: ReactNode }) =>
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<React.StrictMode>{children}</React.StrictMode>
	);

root.render(
	<Parent>
		<AppContextProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</AppContextProvider>
	</Parent>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
