import { Button } from '@mui/material';
import { AppReducerActions } from '../../helpers/enum';
import { useAppState, useAppDispatch } from '../../helpers/hooks/useAppState';

export default () => {
	const {
		ui: { wantList },
	} = useAppState();
	const dispatch = useAppDispatch();
	const toggleWantList = () =>
		dispatch({
			type: AppReducerActions.ToggleWantList,
			wantList: !wantList,
		});
	return (
		<Button
			variant="contained"
			style={{ marginLeft: 5, marginTop: 65 }}
			size="small"
			onClick={toggleWantList}
		>
			View {wantList ? 'Collection' : 'Want List'}
		</Button>
	);
};
