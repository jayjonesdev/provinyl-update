import { CloseOutlined, Search } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { ButtonBar } from './styles';
import { CSSProperties } from 'react';
import { isMobile } from 'react-device-detect';
import { uiState } from '../../helpers/atoms';
import { useRecoilState } from 'recoil';
import { ReleaseListType } from '../../helpers/enum';

export default ({
	style,
	disabled,
	children,
}: {
	style?: CSSProperties;
	disabled?: boolean;
	children?: React.ReactNode;
}) => {
	const [{ currentTab, searchString }, setUiState] = useRecoilState(uiState);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUiState((prev) => ({ ...prev, searchString: e.target.value }));
	};
	const onClear = () => {
		setUiState((prev) => ({ ...prev, searchString: '' }));
	};
	const renderTabString = () => {
		return currentTab === ReleaseListType.Collection
			? 'collection'
			: 'want list';
	};

	return (
		<>
			<div style={{ marginTop: isMobile ? 5 : 75 }}>
				<ButtonBar>
					<TextField
						disabled={disabled}
						data-testid="collection-search-field"
						placeholder={
							isMobile ? 'Search...' : `Search ${renderTabString()}...`
						}
						margin="dense"
						onChange={onChange}
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
							endAdornment: searchString.length > 0 && (
								<InputAdornment position="end">
									<IconButton onClick={onClear}>
										<CloseOutlined />
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="outlined"
						value={searchString}
					/>
					<div style={{ display: 'flex' }}>{children}</div>
				</ButtonBar>
			</div>
		</>
	);
};
