import { Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
import {lightTheme} from "../constantManagement"
import {Field,SelectField,SubmitButton} from "../globalElement"
import {fetchData} from "../fetchData";
import {setCookie,deleteCookie,getCookie} from "../cookie";
import Router from "next/router";


const Login = (props) => {
    
    console.log(props.role)
    const [meta,setMeta] = useState({
        role: props.role,
        email: "",
        password: ""
    })
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
        console.log("nbhji")
        setLoginButton(true);
    }
    const handleSubmission = async () => {
        setLoading(true);
        console.log(meta)
        let data = await fetchData({
            method : "POST",
            url : "/login",
            body : meta
        })
        if(data.status){
            console.log("entering in student task")
            insertCookie(data);
            if(data.role==="instructor"){
                Router.push("instructor/instructorTask");
            }else{
                console.log("entering in student task")
                Router.push("student/studentTask");
            }
        }else{
            //show error
        }
        setLoading(false)
    }
    const insertCookie = (data) => {
        console.log("njio")
        setCookie("jwToken",data.jwToken,1);
        setCookie("name",data.name,1);
        setCookie("role",data.role,1);
        setCookie("email",data.email,1);
        setCookie("id",data.id,1)
        console.log("qwer")
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