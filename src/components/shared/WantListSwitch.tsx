import { Switch, Typography } from '@mui/material';
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
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				marginRight: 25,
			}}
		>
			<Switch
				checked={wantList}
				onChange={toggleWantList}
				inputProps={{ 'aria-label': 'controlled' }}
			/>
			<Typography>View Want List</Typography>
		</div>
	);
};
