import { CloseOutlined, Search } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { ButtonBar } from './styles';
import { CSSProperties } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppState } from '../../helpers/hooks/useAppState';

export default ({
	value,
	style,
	disabled,
	children,
	onChange,
	onClear,
}: {
	value: string;
	style?: CSSProperties;
	disabled?: boolean;
	children?: React.ReactNode;
	onChange: (value: string) => void;
	onClear: () => void;
}) => {
	const {
		ui: { wantList },
	} = useAppState();
	return (
		<>
			<div style={{ marginTop: isMobile ? 5 : 75 }}>
				<ButtonBar>
					<TextField
						disabled={disabled}
						data-testid="collection-search-field"
						placeholder={
							isMobile
								? 'Search...'
								: `Search ${!wantList ? 'collection' : 'want list'}...`
						}
						margin="dense"
						onChange={(e) => onChange(e.target.value)}
						sx={{ width: isMobile ? '100%' : '45%' }}
						style={style}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton>
										<Search />
									</IconButton>
								</InputAdornment>
							),
							endAdornment: value.length > 0 && (
								<InputAdornment position="end">
									<IconButton onClick={onClear}>
										<CloseOutlined />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="outlined"
						value={value}
					/>
					<div style={{ display: 'flex' }}>{children}</div>
				</ButtonBar>
			</div>
		</>
	);
};
