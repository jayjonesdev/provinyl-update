import { Button, styled } from '@mui/material';

export const Container = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const LoginContainer = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Logo = styled('img')`
	width: 40%;
`;

export const DiscogsButton = styled(Button)`
	background-color: black;
	text-align: center;
	color: white;
    font-weight: 800;
	&:hover {
		background-color: grey;
	};
    width: 40%;
`;

export const StyledDiscogsLogo = styled('img')`
	height: 25px;
	width: 25px;
`;
