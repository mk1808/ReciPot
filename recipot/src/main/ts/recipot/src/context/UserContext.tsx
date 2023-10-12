import { createContext, useEffect, useReducer } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";
import { useTranslation } from "react-i18next";
import { ApiRequestSendManager } from "../utils/ApiRequestSendManager";
import useAlerts from "../hooks/useAlerts";

type contextStateModel = AppUser | undefined | null;

type ReducerActionProps = {
    user?: any,
    type: UserContextType
}

export enum UserContextType {
    Logged = "logged",
    Logout = "logout",
    Refresh = "refresh"
};

export const UsersContext = createContext<contextStateModel>(undefined);

export const UsersDispatchContext = createContext<(action: ReducerActionProps) => any>((action: ReducerActionProps) => { });

const searchRequestManager = ApiRequestSendManager();

export const UserContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const alerts = useAlerts();
    const [user, dispatch]: [contextStateModel, (action: ReducerActionProps) => any] = useReducer(
        usersReducer, null
    );

    useEffect(() => {
        dispatch({ type: UserContextType.Refresh })
    }, [])

    function usersReducer(user: contextStateModel, action: ReducerActionProps): contextStateModel {
        switch (action.type) {
            case UserContextType.Logged: {
                return action.user;
            }
            case UserContextType.Logout: {
                authApi.logout(onSuccessLogout, () => { });
                return null;
            }
            case UserContextType.Refresh: {
                refreshRequest();
                return user;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    };

    function refreshRequest() {
        searchRequestManager.nextAndLock(() => {
            authApi.whoAmI(onSuccessRefresh, onError)
        })
    };

    function onSuccessRefresh(response: Response<AppUser>) {
        searchRequestManager.unlock();
        let action = { user: response.value, type: UserContextType.Logged }
        dispatch(action);
        refreshUser();
    };

    function refreshUser() {
        const intervalTime = 1000 * 10; //minute
        setTimeout(() => {
            dispatch({ type: UserContextType.Refresh })
        }, intervalTime);
    };

    function onError(response: any) {
        searchRequestManager.unlock();
        if (user) {
            alerts.showErrorAlert(t("p.userTokenTimeout"));
        }
        dispatch({ user: null, type: UserContextType.Logged });
    };

    function onSuccessLogout(response: Response<any>) {
        alerts.showSuccessAlert(t(response.message));
    };

    return (
        <UsersContext.Provider value={user}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersContext.Provider>
    )
}