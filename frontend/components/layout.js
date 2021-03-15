import Header from "./header";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {lightTheme} from "./constantManagement"
import { useEffect, useState, useContext } from "react";
import { getCookie } from "./cookie";
import {Context} from "../components/context/contextProvider"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const LayoutDiv = styled.div`
  min-height: 93vh;
  background-color: ${lightTheme.background};
  transition-duration: 0.4s;
`

const Layout = ({ children }) => {
    const {user, storeUser, alert,storeAlert} = useContext(Context);
    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      storeAlert({})
      setOpen(false);
    };
    useEffect(() => {
        storeUser();
    },[])
    useEffect(()=>{
        if(alert.status!==undefined){
            setOpen(true)
        }
    },[alert])
    return (
        <>
            <LayoutDiv>
                <Header email={user.email} jwToken={user.jwToken} 
                    role={user.role} name={user.name} id={user.id} />
                {children}
            </LayoutDiv>
            {alert.status !== undefined ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity= {alert.status ? "success" : "error"}>
                        {alert.message}
                    </Alert>
                </Snackbar> : null}
        </>
    );
}

export default Layout;