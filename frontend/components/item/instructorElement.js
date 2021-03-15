import { useContext, useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../constantManagement";
import {DisabledText, StyledLink, Field,SelectField} from "../globalElement"
import { fetchData } from "../fetchData";
import { Context } from "../context/contextProvider";

const InstructorElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark};
    border-radius: 5px;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const InstructorElement = (props) => {
    const [meta,setMeta] = useState({
        instructorName: props.instructor.instructorName,
        email: props.instructor.email,
        taskIds: props.instructor.taskIds,
        studentIds: props.instructor.studentIds,
        id: props.instructor._id
    })
    const [updatedMeta,setUpdatedMeta] = useState({})
    const {storeAlert} = useContext(Context)
    const handleUpdatedMeta = (event,error) => {
        setUpdatedMeta({
            ...updatedMeta,
            [event.target.id]:event.target.value
        })
    }
    let user = props.user;
    const isInstructor = user.role === "instructor" ? true : false;
    const isAlreadyEnrolled = () => {
        if(meta.studentIds.indexOf(user.id)>=0){
            return true
        }else{
            return false
        }
    }

    const enrollStudent = async () => {
        let enrollStudentDetails = await fetchData({
            method: "POST",
            url: "/student/selectInstructor",
            jwToken: user.jwToken,
            body: {
                studentId: user.id,
                instructorId: meta.id
            }
        })
        if(enrollStudentDetails.status){
            storeAlert({
              status: true,
              message: "STUDENT ENROLLED"
            })
        }else{
            storeAlert({
              status: false,
              message: "FAILED TO ENROLL STUDENT"
            })
        }
    }

    return <InstructorElementDiv>
        <Grid container spacing={2} justify={"space-around"} >
            <Grid item lg={3} md={3} sm={3} xs={3} >
                <Field
                    id="instructorName"
                    label="Name"
                    variant="standard"
                    disabled={!isInstructor}
                    value={meta.instructorName}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />  
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <Field
                    id="email"
                    label="Email"
                    variant="standard"
                    disabled={!isInstructor}
                    value={meta.email}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />  
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Field
                    id="noOfTask"
                    label="Total Task"
                    variant="standard"
                    disabled={true}
                    value={meta.taskIds.length}
                    type="name"
                />  
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Field
                    id="noOfStudent"
                    label="Total Student"
                    variant="standard"
                    disabled={true}
                    value={meta.studentIds.length}
                    type="name"
                /> 
            </Grid>
            {isInstructor || !isAlreadyEnrolled() ? null : <Grid item lg={2} md={2} sm={2} xs={2}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    enrollStudent()
                }}>Enroll Instructor</StyledLink>
            </Grid>}
        </Grid>
    </InstructorElementDiv>
}

export default InstructorElement