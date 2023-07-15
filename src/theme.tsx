import { createTheme } from '@mui/material/styles';

export default createTheme({
	palette: {
		background: {
			default: '#D1E3DD',
		},
		primary: {
			main: '#6E7DAB',
		},
		secondary: {
			light: '#575366',
			main: '#32292F',
			contrastText: '#fff',
		},
		text: {
			primary: '#546392',
			secondary: '#fff',
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: ['Avenir', 'Roboto'].join(','),
		// htmlFontSize: 14,
		// fontSize: 14,
		button: {
			textTransform: 'none',
		},
	},
});
