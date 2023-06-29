import { Menu, MenuItem, styled } from '@mui/material';

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
`
);

export const StyledMenu = styled(Menu)`
	margin-top: 45px;
`;
