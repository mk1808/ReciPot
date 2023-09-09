import { createContext, useEffect, Context, useReducer } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";

export const UsersContext: Context<{ user?: AppUser }> = createContext({});

export const UsersDispatchContext = createContext<Function>(() => { });

export const UserContextProvider = ({ children }: any) => {
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

    function onSuccessLogout(response: Response<AppUser>) {
        console.log(response.value);
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