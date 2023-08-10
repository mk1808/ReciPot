import React, { createContext, useContext, useState, useEffect, Context } from "react";
import authApi from "../api/AuthApi";
import usersApi from "../api/UsersApi";
import { AppUser, Response } from "../data/types";

const myUser = { id: "abc", name: "John" };

export const UserContext: Context<{ user?: AppUser }> = createContext({});
export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<AppUser>();
    const onSuccess = (response: Response<AppUser>) => {
        console.log(response.value);
        setUser(response.value);
    }
    useEffect(() => {
        authApi.whoAmI(onSuccess, () => { })

    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
