import { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../constantManagement";
import {DisabledText, StyledLink, Field,SelectField} from "../globalElement"
import { fetchData } from "../fetchData";

const StudentElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark};
    border-radius: 5px;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const StudentElement = (props) => {
    const [meta,setMeta] = useState({
        studentName: props.student.studentName,
        email: props.student.email,
        taskIds: props.student.taskIds,
        instructorIds: props.student.instructorIds,
        id: props.student._id
    })
    const [updatedMeta,setUpdatedMeta] = useState({})
    const handleUpdatedMeta = (event,error) => {
        setUpdatedMeta({
            ...updatedMeta,
            [event.target.id]:event.target.value
        })
    }
    let user = props.user;
    const isInstructor = user.role === "instructor" ? true : false;
    const viewSubmission = () => {

    }

    return <StudentElementDiv>
        <Grid container spacing={2} justify={"space-around"} >
            <Grid item lg={3} md={3} sm={3} xs={3} >
                <Field
                    id="studentName"
                    label="Name"
                    variant="standard"
                    disabled={isInstructor}
                    value={meta.studentName}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />  
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <Field
                    id="email"
                    label="Email"
                    variant="standard"
                    disabled={isInstructor}
                    value={meta.email}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />  
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Field
                    id="noOfInstructor"
                    label="Instructors Enrolled"
                    variant="standard"
                    disabled={true}
                    value={meta.instructorIds.length}
                    type="name"
                /> 
            </Grid>
            {isInstructor ? <Grid item lg={2} md={2} sm={4} xs={4}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    viewSubmission()
                }}>View Student Submission</StyledLink>
            </Grid> : null}
        </Grid>
    </StudentElementDiv>
}

export default StudentElement