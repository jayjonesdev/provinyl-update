import { Camera, Pin, TextFields } from '@mui/icons-material';
import { Fab, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { AddMenuSlotProps, FabContainer } from './styles';

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
		<FabContainer>
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
				id="add-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 180 }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				slotProps={AddMenuSlotProps}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Camera />
					</ListItemIcon>
					Scan Barcode
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Pin />
					</ListItemIcon>
					Add by Catalog #
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<TextFields />
					</ListItemIcon>
					Add by Album Title
				</MenuItem>
			</Menu>
		</FabContainer>
	);
};
