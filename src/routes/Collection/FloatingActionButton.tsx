import { PersonAdd, Settings, Logout, Camera } from '@mui/icons-material';
import {
	Fab,
	Menu,
	MenuItem,
	Avatar,
	Divider,
	ListItemIcon,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

export default () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div
			style={{
				position: 'fixed',
				bottom: 0,
				right: 0,
				padding: 10,
				zIndex: 101,
				width: '100%',
				display: 'flex',
				justifyContent: 'flex-end',
				backgroundImage:
					'-webkit-linear-gradient(top, rgba(60, 60, 60, 0) 0%, rgba(60, 60, 60, 0.7) 70%, rgba(60, 60, 60, 1.0) 100%)',
			}}
		>
			<Fab
				color="primary"
				aria-label="add"
				size="large"
				onClick={handleClick}
				variant="extended"
				style={{ display: 'flex', alignItems: 'center' }}
			>
				<AddIcon style={{ marginRight: 5 }} />
				<Typography variant="body1" fontWeight={600}>
					Add
				</Typography>
			</Fab>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				sx={{ mb: 5 }}
				slotProps={{
					paper: {
						elevation: 1,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							// '&:before': {
							// 	content: '""',
							// 	display: 'block',
							// 	position: 'absolute',
							// 	top: 0,
							// 	right: 14,
							// 	width: 10,
							// 	height: 10,
							// 	bgcolor: 'background.paper',
							// 	transform: 'translateY(-50%) rotate(45deg)',
							// 	zIndex: 0,
							// },
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Camera fontSize="small" />
					</ListItemIcon>
					Scan Barcode
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</div>
	);
};
