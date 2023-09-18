import { useContext } from 'react';
import { AppDispatchContext, AppStatContext } from '../../AppContext';

export const useAppState = () => {
	return useContext(AppStatContext);
};

export const useAppDispatch = () => {
	return useContext(AppDispatchContext);
};
