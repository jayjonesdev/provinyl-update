import { AccountCircle, Link } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import theme from '../../theme';
import { StyledMenuItem, StyledProvinylLogo, StyledMenu } from './styles';
import ProvinylLogo from '../../assets/secondary_logo_small.png';
import { useState } from 'react';
import { type MenuOptions } from '../../types';
import { EMAIL, PAYPAL_LINK } from '../../constants';

export default () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logout = () => {
		handleCloseUserMenu();
		window.location.assign('/Login');
	};

	const MENU_OPTIONS: MenuOptions[] = [
		{
			label: 'Donate',
			onClick: () => {
				window.open(PAYPAL_LINK, '_blank');
				handleCloseUserMenu();
			},
		},
		{
			label: 'Information',
			onClick: () => {},
		},
		{
			label: 'Contact',
			onClick: () => {
				window.open(`mailto:${EMAIL}`, '_self');
				handleCloseUserMenu();
			},
		},
		{
			label: 'Logout',
			onClick: logout,
		},
	];

	return (
		<AppBar position='static'>
			<Toolbar>
				<StyledProvinylLogo
					src={ProvinylLogo}
					alt='logo'
					onClick={() => window.location.assign('/')}
				/>
				<Typography
					variant='h6'
					component='div'
					sx={{ marginLeft: theme.spacing(2), flexGrow: 1 }}
				>
					Your Collection
				</Typography>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='link'
					sx={{ mr: 2 }}
				>
					<Link />
				</IconButton>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					onClick={handleOpenUserMenu}
				>
					<AccountCircle />
				</IconButton>
				<StyledMenu
					sx={{
						'& .MuiMenu-paper': {
							backgroundColor: theme.palette.primary.main,
							color: '#fff',
						},
					}}
					id='menu-appbar'
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{MENU_OPTIONS.map((menuOption) => (
						<StyledMenuItem key={menuOption.label} onClick={menuOption.onClick}>
							<Typography textAlign='center'>{menuOption.label}</Typography>
						</StyledMenuItem>
					))}
				</StyledMenu>
			</Toolbar>
		</AppBar>
	);
};
