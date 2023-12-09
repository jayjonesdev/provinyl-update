import { AccountCircle, Link } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import theme from '../../theme';
import { StyledMenuItem, StyledProvinylLogo, StyledMenu } from './styles';
import ProvinylLogo from '../../assets/secondary_logo_small.png';
import { useState } from 'react';
import { type MenuOptions } from '../../helpers/types';
import { EMAIL, PAYPAL_LINK } from '../../helpers/constants';
import InformationDialog from './InformationDialog';
import LogoutDialog from './LogoutDialog';
import { useAppDispatch, useAppState } from '../../helpers/hooks/useAppState';
import {
	AppReducerActions,
	ReleaseListType,
	ViewType,
} from '../../helpers/enum';
import ShareableLinkPopover from './ShareableLinkPopover';
import { isMobile } from 'react-device-detect';

export default ({
	value,
	numOfItems,
	readOnly,
	username,
}: {
	value: string;
	numOfItems: string;
	readOnly: boolean;
	username?: string;
}) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [informationOpen, setInformationOpen] = useState<boolean>(false);
	const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
	const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();
	const {
		ui: { wantList },
	} = useAppState();

	const handleDialogClose = () => setInformationOpen(false);
	const handleLogoutClose = () => setLogoutOpen(false);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorElUser(event.currentTarget);
	const handleCloseUserMenu = () => setAnchorElUser(null);
	const showShareableLinkPopover = (event: React.MouseEvent<HTMLElement>) => {
		setPopoverAnchor(event.currentTarget);
		dispatch({
			type: AppReducerActions.ShowShareableLinkPopover,
			shareableLinkPopover: true,
		});
	};

	const logout = () => {
		setLogoutOpen(false);
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
			onClick: () => {
				setInformationOpen(true);
				handleCloseUserMenu();
			},
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
			onClick: () => {
				setLogoutOpen(true);
				handleCloseUserMenu();
			},
		},
	];

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<StyledProvinylLogo
						src={ProvinylLogo}
						alt="logo"
						onClick={() => window.location.assign('/')}
					/>
					<Typography
						variant="h6"
						component="div"
						sx={{ marginLeft: theme.spacing(2), flexGrow: 1 }}
					>
						{username ? `${username}'s` : 'Your'}{' '}
						{!wantList ? 'Collection' : 'Want List'}
					</Typography>
					{!readOnly && (
						<>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="link"
								sx={{ mr: 2 }}
								onClick={showShareableLinkPopover}
							>
								<Link fontSize="large" />
							</IconButton>
							<IconButton
								data-testid="menu-button"
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={handleOpenUserMenu}
							>
								<AccountCircle fontSize="large" />
							</IconButton>
							<StyledMenu
								sx={{
									'& .MuiMenu-paper': {
										backgroundColor: theme.palette.primary.main,
										color: '#fff',
									},
								}}
								id="menu-appbar"
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
								data-testid="menu"
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{MENU_OPTIONS.map((menuOption) => (
									<StyledMenuItem
										key={menuOption.label}
										onClick={menuOption.onClick}
										sx={{
											':hover': {
												backgroundColor: theme.palette.primary.light,
											},
										}}
									>
										<Typography textAlign="center">
											{menuOption.label}
										</Typography>
									</StyledMenuItem>
								))}
							</StyledMenu>
						</>
					)}
				</Toolbar>
			</AppBar>
			<InformationDialog
				value={value}
				numOfItems={numOfItems}
				open={informationOpen}
				handleClose={handleDialogClose}
			/>
			<LogoutDialog
				open={logoutOpen}
				handleClose={handleLogoutClose}
				handleAction={logout}
			/>
			<ShareableLinkPopover anchor={popoverAnchor} />
		</>
	);
};
