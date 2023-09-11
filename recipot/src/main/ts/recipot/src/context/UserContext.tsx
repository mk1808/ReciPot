import { createContext, useEffect, Context, useReducer, useContext } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";
import { showSuccessAlert } from "../utils/RestUtils";
import { useTranslation } from "react-i18next";
import { AlertsDispatchContext } from "./AlertContext";

export const UsersContext: Context<{ user?: AppUser }> = createContext({});

export const UsersDispatchContext = createContext<Function>(() => { });

export const UserContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const [user, dispatch]: [any, Function] = useReducer(
        usersReducer, null
    );

    function onSuccessRefresh(response: Response<AppUser>) {
        console.log(response.value);
        let action = { user: response.value, type: 'logged' }
        dispatch(action);
    };

    function onError(response: any) {
        console.log("error")
    };

    function onSuccessLogout(response: Response<any>) {
        showSuccessAlert((response.message), alertsDispatchContext);
        console.log(response);
    };

    function usersReducer(user: any, action: any) {
        switch (action.type) {
            case 'logged': {
                return action.user;
            }
            case 'logout': {
                authApi.logout(onSuccessLogout, () => { });
                return null;
            }
            case 'refresh': {
                authApi.whoAmI(onSuccessRefresh, onError)
                return user;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }
    useEffect(() => {
        dispatch({ type: 'refresh' })
    }, [])

    return (
        <UsersContext.Provider value={{ user }}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersContext.Provider>
    )
}