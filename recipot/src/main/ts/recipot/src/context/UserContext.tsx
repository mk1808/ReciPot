import { createContext, useEffect, useReducer } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";
import { useTranslation } from "react-i18next";
import { ApiRequestSendManager } from "../utils/ApiRequestSendManager";
import useAlerts from "../hooks/useAlerts";

export const UsersContext = createContext<AppUser | undefined>(undefined);

export const UsersDispatchContext = createContext<Function>(() => { });

const searchRequestManager = ApiRequestSendManager();

export const UserContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const alerts = useAlerts(); 
    const [user, dispatch]: [any, Function] = useReducer(
        usersReducer, null
    );

    function refreshRequest() {
        searchRequestManager.nextAndLock(() => {
            authApi.whoAmI(onSuccessRefresh, onError)
        })
    }

    function onSuccessRefresh(response: Response<AppUser>) {
        searchRequestManager.unlock();
        let action = { user: response.value, type: 'logged' }
        dispatch(action);
        refreshUser();
    };

    function onError(response: any) {
        searchRequestManager.unlock();
        if (user) {
            alerts.showErrorAlert(t("p.userTokenTimeout"));
        }
        dispatch({ user: null, type: 'logged' });
    };

    function onSuccessLogout(response: Response<any>) {
        alerts.showSuccessAlert(t(response.message));
    };

    function refreshUser() {
        const intervalTime = 1000 * 10; //minute
        setTimeout(() => {
            dispatch({ type: 'refresh' })
        }, intervalTime);
    }

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
                refreshRequest();
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
        <UsersContext.Provider value={user}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersContext.Provider>
    )
}