import { createContext, useEffect, Context, useReducer } from "react";
import authApi from "../api/AuthApi";
import { AppUser, Response } from "../data/types";

export const UsersContext: Context<{ user?: AppUser }> = createContext({});

export const UsersDispatchContext = createContext<Function>(() => { });

export const UserContextProvider = ({ children }: any) => {
    const [user, dispatch]: [any, Function] = useReducer(
        usersReducer, null
    );

    function onSuccess(response: Response<AppUser>) {
        console.log(response.value);
        let action = { user: response.value, type: 'logged' }
        dispatch(action);
    };

    function usersReducer(user: any, action: any) {
        switch (action.type) {
            case 'logged': {
                return action.user;
            }
            case 'loggedOut': {
                return null;
            }
            case 'refresh': {
                authApi.whoAmI(onSuccess, () => { })
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