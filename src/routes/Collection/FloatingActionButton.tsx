import { Camera, Pin, TextFields } from '@mui/icons-material';
import { Fab, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { AddMenuSlotProps, FabContainer } from './styles';
import { useNavigate } from 'react-router-dom';
import { SearchType } from '../../helpers/enum';
import { getSearchTypeKey } from '../../helpers';

export default () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onClick = (searchType: SearchType) => {
		navigate(`/collection/search/${getSearchTypeKey(searchType)}`);
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
				transformOrigin={{ horizontal: 'right', vertical: 180 }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				slotProps={AddMenuSlotProps}
			>
				<MenuItem onClick={() => onClick(SearchType.BARCODE)}>
					<ListItemIcon>
						<Camera />
					</ListItemIcon>
					Scan Barcode
				</MenuItem>
				<MenuItem onClick={() => onClick(SearchType.CATALOG_NUMBER)}>
					<ListItemIcon>
						<Pin />
					</ListItemIcon>
					Add by Catalog #
				</MenuItem>
				<MenuItem onClick={() => onClick(SearchType.ALBUM_TITLE)}>
					<ListItemIcon>
						<TextFields />
					</ListItemIcon>
					Add by Album Title
				</MenuItem>
			</Menu>
		</FabContainer>
	);
};
