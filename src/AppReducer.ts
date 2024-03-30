import { AppReducerActions, ReleaseListType, ViewType } from './helpers/enum';
import {
	AppActionType,
	AppStateType,
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
			const { release: newRelease, list: listType } = action;

			updatedCollection = [...state.collection.releases];

			if (listType === ReleaseListType.Collection) {
				updatedCollection = [...state.collection.releases];
			} else {
				updatedCollection = [...state.collection.wantList];
			}

			const index = updatedCollection.findIndex(
				(item) => item.artist > newRelease.artist,
			);

			const updatedRelease = {
				...newRelease,
				wantList: listType === ReleaseListType.WantList,
			};

			if (index === -1) {
				updatedCollection.push(updatedRelease);
			} else {
				updatedCollection.splice(index, 0, updatedRelease);
			}

			return {
				...state,
				collection:
					listType === ReleaseListType.Collection
						? {
								...state.collection,
								releases: updatedCollection,
						  }
						: {
								...state.collection,
								wantList: updatedCollection,
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

		case AppReducerActions.ToggleShareableLinkPopover:
			const { shareableLinkPopover } = action;

			return {
				...state,
				ui: {
					...state.ui,
					shareableLinkPopover,
				},
			};

		case AppReducerActions.ToggleWantList:
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
