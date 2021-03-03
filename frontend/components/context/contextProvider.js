import React, { createContext, useState} from 'react';
import FetchData from "../fetchData";
import { getCookie } from "../cookie";
import Router from "next/router"
export const Context = createContext();

const ContextProvider = (props) => {
    const [user,setUser] = useState({
        email: ""
    });
    const storeUser = (data) => {
        if (!user.email || !user.role || !user.jwToken) {
            let email = getCookie("email");
            let role = getCookie("role");
            let jwToken = getCookie("jwToken");
            let name = getCookie("name")
            let id = getCookie("id")
            if (!email || !role || !jwToken || !name) {
              Router.push("/auth");
            } else {
              setUser({
                email: email,
                role: role,
                jwToken: jwToken,
                name: name,
                id: id
              });
              //call required function to get things about user
            }
        }else{
              //call required function to get things about user
        }
    }

    return <Context.Provider value={{user, storeUser}}>
        {props.children}
    </Context.Provider>
}

export default ContextProvider;