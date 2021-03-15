import Grid from "@material-ui/core/Grid";
import {Field, SubmitButton} from "../globalElement";
import {lightTheme} from "../constantManagement"
import { useState, useContext } from "react";
import {fetchData} from "../fetchData"
import { Router } from "next/router";
import { Context } from "../context/contextProvider";

const CreateStudentForm = (props) => {
    const [meta,setMeta] = useState({
        studentName: "",
        password: "",
        email: ""
    });
    const {storeAlert} = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [validate, setValidate] = useState({
        studentName: false,
        password: false,
        email: false,
    });
    const [createButton, setCreateButton] = useState(false);
    const handleMeta = (event, error) => {
        setMeta({
          ...meta,
          [event.target.id]: event.target.value,
        });
        setValidate({
              ...validate,
              [event.target.id]: !error,
        });
        if (error) {
              setCreateButton(false);
              return;
        }
        for (let key in validate) {
              if (!validate[key]) {
                if (key != event.target.id) {
                  setCreateButton(false);
                  return;
                }
              }
        }
        setCreateButton(true);
    };
    const handleSubmission = async () => {
      setLoading(true);
      let studentDetails = await fetchData({
          method : "POST",
          url : "/student/createStudent",
          jwToken : "",
          body : meta
      })
      if(studentDetails.status){
        Router.push("student/allTask");
      }else{
        storeAlert({
          status: false,
          message: "LOGIN FAILED"
        })
      }
      setLoading(false)
    }
    return <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Field
              id="studentName"
              label="Name"
              handleFunc={handleMeta}
              type="name"
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Field
              id="email"
              label="Email"
              type="email"
              handleFunc={handleMeta}
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Field
              id="password"
              label="Password"
              type="password"
              handleFunc={handleMeta}
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <center>
                <SubmitButton
                    id="submit"
                    text="CREATE student"
                    color={lightTheme.white}
                    disabled={!createButton || loading}
                    backgroundColor={!createButton || loading ? lightTheme.disabled :lightTheme.primary50}
                    handleFunc={handleSubmission}
                />
            </center>
        </Grid>
    </Grid>
}


export default CreateStudentForm