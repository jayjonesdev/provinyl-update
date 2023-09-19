import { AppReducerActions } from './helpers/enum';
import { AppActionType, AppStateType } from './helpers/types';

export const initialState: AppStateType = {
	user: {
		username: '',
		id: -1,
		resource_url: '',
		consumer_name: '',
	},
	collection: {
		value: '',
		numberOfItems: 0,
	},
	currentRelease: {
		title: '',
		artist: '',
		year: 0,
		labels: '',
		genres: '',
		catno: '',
		releaseId: 0,
		imageUrl: '',
		instanceId: 0,
	},
};

export const AppReducer = (
	state: AppStateType = initialState,
	action: AppActionType,
): AppStateType => {
	switch (action.type) {
		case AppReducerActions.UpdateUserInfo:
			const { user } = action;

			return {
				...state,
				user,
			};

		case AppReducerActions.UpdateCollectionInfo:
			const { collection } = action;

			return {
				...state,
				collection,
			};

		case AppReducerActions.SetCurrentRelease:
			const { release } = action;

			return {
				...state,
				currentRelease: release,
			};
		default:
			return state;
	}
};
