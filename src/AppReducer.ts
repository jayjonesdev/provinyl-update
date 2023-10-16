import { AppReducerActions } from './helpers/enum';
import { AppActionType, AppStateType, SnackbarType } from './helpers/types';

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
		releases: [],
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
	snackbar: {} as SnackbarType,
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

		case AppReducerActions.SetSnackbar:
			const { snackbar } = action;
			return {
				...state,
				snackbar,
			};

		case AppReducerActions.RemoveRelease:
			const { releaseId } = action;

			const updatedCollection = [...state.collection.releases].filter(
				(release) => release.releaseId !== releaseId,
			);

			return {
				...state,
				collection: {
					...state.collection,
					releases: updatedCollection,
				},
			};

		default:
			return state;
	}
};
