import { Button } from '@mui/material';
import { AppReducerActions, ViewType } from '../../helpers/enum';
import { ViewList, ViewDay } from '@mui/icons-material';
import { useAppState, useAppDispatch } from '../../helpers/hooks/useAppState';

export default () => {
	const {
		ui: { viewType },
	} = useAppState();
	const dispatch = useAppDispatch();
	const changeView = (viewType: ViewType) =>
		dispatch({
			type: AppReducerActions.UpdateView,
			viewType,
		});

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
