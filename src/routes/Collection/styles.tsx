import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormHelperText,
	Menu,
	MenuItem,
	Table,
	TableCell,
	TableHead,
	TableRow,
	styled,
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const StyledProvinylLogo = styled('img')`
	height: 50px;
	width: 50px;
	box-sizing: border-box;
	cursor: pointer;
`;

export const StyledMenuItem = styled(MenuItem)(
	({ theme }) => `
&:hover {
    background-color: ${theme.palette.secondary.light};
    color: white;
}
`,
);

export const StyledMenu = styled(Menu)`
	margin-top: 45px;
`;

export const StyledDialogTitle = styled(DialogTitle)(
	({ theme }) => `
background-color: ${theme.palette.primary.main};
color: ${theme.palette.text.secondary};
`,
);

export const StyledDialog = styled(Dialog)`
	border-radius: 5px;
`;

export const StyledDialogContent = styled(DialogContent)(
	({ theme }) => `
background-color: ${theme.palette.background.default};
`,
);

export const StyledDialogActions = styled(DialogActions)(
	({ theme }) => `
background-color: ${theme.palette.background.default};
`,
);

export const StyledDialogContentText = styled('div')(
	({ theme }) => `
color: ${theme.palette.text.primary};
padding-top: ${theme.spacing()};
display: flex;
flex-direction: column;
`,
);

export const StyledDivider = styled(Divider)(
	({ theme, orientation = 'horizontal' }) => `
background-color: ${theme.palette.primary.main};
height: ${orientation === 'horizontal' ? '2px' : 'inherit'};
margin: ${orientation === 'horizontal' ? '.5em 0px .5em 0' : '20px 10px'};
width: ${orientation === 'horizontal' ? 'inherit' : '2px'};
`,
);

export const InstagramLink = styled('div')`
	display: flex;
	align-items: center;
`;

export const Container = styled('div')`
	padding: 20px 35px;
`;

export const ButtonBar = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const StyledHelperText = styled(FormHelperText)(
	({ theme }) => `
color: ${theme.palette.text.primary};
`,
);

export const SearchContainer = styled('div')`
	display: flex;
	margin-top: 15px;
	align-items: flex-start;
`;

export const StyledTableHead = styled(TableHead)(
	({ theme }) => `
background-color: ${theme.palette.secondary.light};
`,
);

export const StyledTable = styled(Table)`
	border-collapse: 'separate';
	table-layout: 'fixed';
`;

export const StyledTableRow = styled(TableRow)(
	({ theme }) => `
cursor: pointer;
&:hover > td {
	background-color: ${theme.palette.primary.main};
	color: #fff;
}
`,
);

export const StyledCell = styled(TableCell)(
	({ theme }) => `
font-weight: 500;
color: ${theme.palette.primary.main};
line-height: 1.25;
&:hover > td {
	color: #fff;
}
`,
);

export const AlbumArtwork = styled(LazyLoadImage)`
	width: 300px;
	height: 300px;
	border-radius: 5px;
	margin-top: 25px;
`;

// 300px is the width of the album artwork
export const GridContainer = styled('div')`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const GridTile = styled('div')`
	&:hover {
		cursor: pointer;
	}
`;

export const SpinnerContainer = styled(Box)`
	display: flex;
	width: 300px;
	height: 300px;
	align-items: center;
`;
