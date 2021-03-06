import Header from "./header";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {lightTheme} from "./constantManagement"
import { useEffect, useState, useContext } from "react";
import { getCookie } from "./cookie";
import {Context} from "../components/context/contextProvider"


const LayoutDiv = styled.div`
  min-height: 93vh;
  background-color: ${lightTheme.background};
  transition-duration: 0.4s;
`

const Layout = ({ children }) => {
    const {user, storeUser} = useContext(Context);
    useEffect(() => {
        storeUser();
    },[])
    return (
        <>
            <LayoutDiv>
                <Header email={user.email} jwToken={user.jwToken} 
                    role={user.role} name={user.name} id={user.id} />
                {children}
            </LayoutDiv>
        </>
    );
}

export default Layout;