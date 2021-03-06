import { Grid } from "@material-ui/core"
import { useContext, useEffect, useState } from "react"
import {lightTheme} from "../constantManagement"
import {Field,SelectField,SubmitButton} from "../globalElement"
import {fetchData} from "../fetchData";
import {setCookie,deleteCookie,getCookie} from "../cookie";
import Router from "next/router";
import { Context } from "../context/contextProvider";


const Login = (props) => {
    const [meta,setMeta] = useState({
        role: props.role,
        email: "",
        password: ""
    })
    const {storeAlert} = useContext(Context)
    const [validate, setValidate] = useState({
        email: false,
        password: false
    });
    const [loading, setLoading] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    useEffect(() => {
        setMeta({
            ...meta,
            role: props.role
        })
    },[props.role])

    const handleMeta = (event,error) => {
        setMeta({
            ...meta,
            [event.target.id]: event.target.value,
          });
        setValidate({
              ...validate,
              [event.target.id]: !error,
        });
        if (error) {
            setLoginButton(false);
            return;
        }
        for (let key in validate) {
            if (!validate[key]) {
              if (key != event.target.id) {
                setLoginButton(false);
                return;
              }
            }
        }
        setLoginButton(true);
    }
    const handleSubmission = async () => {
        setLoading(true);
        let data = await fetchData({
            method : "POST",
            url : "/login",
            body : meta
        })
        if(data.status){
            insertCookie(data);
            if(data.role==="instructor"){
                Router.push("instructor/allTask");
            }else{
                Router.push("student/allTask");
            }
        }else{
            //show error
            storeAlert({
                status: false,
                message: "LOGIN FAILED"
            })
        }
        setLoading(false)
    }
    const insertCookie = (data) => {
        setCookie("jwToken",data.jwToken,1);
        setCookie("name",data.name,1);
        setCookie("role",data.role,1);
        setCookie("email",data.email,1);
        setCookie("id",data.id,1)
    }
    return <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12} >
            <Field
              id="email"
              label="Email"
              type="email"
              value={meta.email}
              handleFunc={handleMeta}
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} >
            <Field
              id="password"
              label="Password"
              type="password"
              value={meta.password}
              handleFunc={handleMeta}
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <center>
                <SubmitButton
                    id="login"
                    text="LOGIN"
                    color={lightTheme.white}
                    disabled={!loginButton || loading}
                    backgroundColor={!loginButton || loading ? lightTheme.disabled :lightTheme.primary50}
                    handleFunc={handleSubmission}
                />
            </center>
        </Grid>
    </Grid>
}
export default Login