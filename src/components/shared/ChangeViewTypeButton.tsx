import { Button } from '@mui/material';
import { ViewType } from '../../helpers/enum';
import { ViewList, ViewDay } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { uiState } from '../../helpers/atoms';

export default () => {
	const [ui, setUiState] = useRecoilState(uiState);
	const { viewType } = ui;

	const changeView = (viewType: ViewType) => {
		setUiState({ ...ui, viewType });
	};

	const toggleView = () => {
		if (viewType === ViewType.GRID) changeView(ViewType.TABLE);
		else changeView(ViewType.GRID);
	};
	const ViewTypeIcon = () =>
		viewType === ViewType.GRID ? <ViewList /> : <ViewDay />;

	return (
		<Button
			data-testid="toggle-view-type-btn"
			variant="contained"
			size="large"
			sx={{ mr: 2 }}
			onClick={toggleView}
			startIcon={<ViewTypeIcon />}
		>
			View {viewType === ViewType.GRID ? 'Table' : 'Grid'}
		</Button>
	);
};
