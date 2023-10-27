import { AppReducerActions, ReleaseListType, ViewType } from './helpers/enum';
import {
	AppActionType,
	AppStateType,
	SnackbarType,
	UserCollectionItem,
} from './helpers/types';

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
		wantList: [],
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
	ui: {
		viewType: ViewType.GRID,
		wantList: false,
		shareableLinkPopover: false,
	},
};

let updatedCollection: UserCollectionItem[] = [];

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
			const { releaseId, list } = action;

			if (list === ReleaseListType.Collection) {
				updatedCollection = [...state.collection.releases].filter(
					(release) => release.releaseId !== releaseId,
				);
			} else {
				updatedCollection = [...state.collection.wantList].filter(
					(release) => release.releaseId !== releaseId,
				);
			}

			return {
				...state,
				collection:
					list === ReleaseListType.Collection
						? {
								...state.collection,
								releases: updatedCollection,
						  }
						: {
								...state.collection,
								wantList: updatedCollection,
						  },
			};

		case AppReducerActions.AddRelease:
			const { release: newRelease } = action;

			updatedCollection = [...state.collection.releases];

			const index = updatedCollection.findIndex(
				(item) => item.artist > newRelease.artist,
			);

			if (index === -1) {
				updatedCollection.push(newRelease);
			} else {
				updatedCollection.splice(index, 0, newRelease);
			}
			return {
				...state,
				collection: {
					...state.collection,
					releases: updatedCollection,
				},
			};

		case AppReducerActions.UpdateView:
			const { viewType } = action;

			return {
				...state,
				ui: {
					...state.ui,
					viewType,
				},
			};

		case AppReducerActions.ShowShareableLinkPopover:
			const { shareableLinkPopover } = action;

			return {
				...state,
				ui: {
					...state.ui,
					shareableLinkPopover,
				},
			};

		case AppReducerActions.ShowWantList:
			const { wantList } = action;

			return {
				...state,
				ui: {
					...state.ui,
					wantList,
				},
			};

		default:
			return state;
	}
};
