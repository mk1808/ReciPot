import { createContext, useEffect, Context, useReducer, useContext, useRef } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";
import { showErrorAlert, showSuccessAlert } from "../utils/RestUtils";
import { useTranslation } from "react-i18next";
import { AlertsDispatchContext } from "./AlertContext";
import { ApiRequestSendManager } from "../utils/ApiRequestSendManager";

export const UsersContext: Context<{ user?: AppUser }> = createContext({});

export const UsersDispatchContext = createContext<Function>(() => { });

const searchRequestManager = ApiRequestSendManager();

export const UserContextProvider = ({ children }: any) => {
    const { t } = useTranslation();
    const alertsDispatchContext = useContext(AlertsDispatchContext);
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
        console.log(response.value);
        let action = { user: response.value, type: 'logged' }
        dispatch(action);
        refreshUser();
    };

    function onError(response: any) {
        searchRequestManager.unlock();
        if (user) {
            showErrorAlert(t("p.userTokenTimeout"), alertsDispatchContext);
        }
        dispatch({ user: null, type: 'logged' });
    };

    function onSuccessLogout(response: Response<any>) {
        showSuccessAlert(t(response.message), alertsDispatchContext);
        console.log(response);
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
        <UsersContext.Provider value={{ user }}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersContext.Provider>
    )
}