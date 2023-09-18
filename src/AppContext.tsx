import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { AppActionType, AppStateType } from "./helpers/types";
import { AppReducer, initialState } from "./AppReducer";

export const AppStatContext = createContext<AppStateType>(initialState);
export const AppDispatchContext = createContext<Dispatch<AppActionType>>(() => {});

export const AppContextProvider = ({ children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return(<AppStatContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
            {children}
        </AppDispatchContext.Provider>
    </AppStatContext.Provider>);
}