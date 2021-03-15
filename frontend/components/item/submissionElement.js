import { useContext, useState } from "react";
import styled from "styled-components";
import {fetchData} from "../fetchData"
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { lightTheme} from "../constantManagement";
import {StyledLink, Field, SelectField} from "../globalElement"
import { Context } from "../context/contextProvider";

const SubmissionElement = (props) => {
    const [meta,setMeta] = useState({
        updatedAt: props.submission.updatedAt,
        marks: props.submission.marks,
        studentId:props.submission.studentId,
        taskId: props.submission.taskId._id,
        taskName: props.submission.taskId.taskName,
        imageUrl : props.submission.imageUrl,
        id: props.submission._id,
        studentName: props.submission.studentId.studentName,
        email: props.submission.studentId.email
    })
    const handleMarks = (event,error) => {
        setMeta({
            ...meta,
            marks: event.target.value
        });
    }
    const {storeAlert} = useContext(Context)
    const [loading,setLoading] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const [evaluationMode,setEvaluationMode] = useState(false);
    let user = props.user;
    let isInstructor = user.role === "instructor" ? true : false;
    const openImage = (url) => {
        window.open(url)
    }
    const changeEditMode = () => {
        if(editMode){
            updateSubmission();
        }
        setEditMode(!editMode)
    }
    
    const updateSubmission = async () => {
        if(loading){
            return
        }else{
            setLoading(true)
        }
        let formData = new FormData(document.getElementById("updateSubmissionForm"));
        formData.append('submissionId',meta.id);
        let updateSubmissionDetails = await fetchData({
            method: "FORM",
            url:"/submission/updateSubmission",
            jwToken: user.jwToken,
            body: formData
        });
        if(updateSubmissionDetails.status){
            setMeta({
                ...meta,
                imageUrl: updateSubmissionDetails.data.updatedSubmission.imageUrl
            })
            storeAlert({
                status: true,
                message: "SUBMISSION UPDATED"
            })
        }else{
            storeAlert({
                status: false,
                message: "SUBMISSION UPDATION FAILED"
            })
        }
        setLoading(false)
    }
    const updateMarks = async () => {
        if(loading){
            return
        }else{
            setLoading(true)
        }
        let body = {
            submissionId: meta.id,
            marks: meta.marks
        }
        let updateSubmissionMarksDetails = await fetchData({
            method: "POST",
            url: "/submission/putMarks",
            jwToken: user.jwToken,
            body: body
        });
        if(updateSubmissionMarksDetails.status){
            setMeta({
                ...meta,
                marks: updateSubmissionMarksDetails.data.marks
            })
            storeAlert({
                status: true,
                message: "MARKS UPDATED"
            })
        }else{
            storeAlert({
                status: false,
                message: "UPDATED FAILED"
            })
        }
        console.log(updateSubmissionMarksDetails)
        setLoading(false)
    }
    const cancelUpdate = () => {
        setEditMode(false)
        setEvaluationMode(false)
    }
    const changeEvaluationMode = () => {
        if(evaluationMode){
            updateMarks();
        }
        setEvaluationMode(!evaluationMode)
    }
    return <Grid container spacing={2} justify={"space-between"}>
        {isInstructor ? <Grid item lg={2} md={3} sm={4} xs={4}>
            <Field
                id="studentName"
                label="Student Name"
                variant="standard"
                disabled={true}
                value={meta.studentName}
                type="name"
            />
        </Grid> : null }
        { isInstructor ? <Grid item lg={2} md={3} sm={4} xs={4}>
            <Field
                id="email"
                label="Email"
                variant="standard"
                disabled={true}
                value={meta.email}
                type="name"
            />
        </Grid> : null }
        { isInstructor ? <Grid item lg={2} md={3} sm={4} xs={4}>
            <Field
                id="taskName"
                label="Task Name"
                variant="standard"
                disabled={true}
                value={meta.taskName}
                type="name"
            />
        </Grid> : null }
        <Grid item lg={2} md={2} sm={4} xs={4}>
            <Field
                id="updatedAt"
                label="Updated At"
                variant="standard"
                disabled={true}
                value={meta.updatedAt}
                type="name"
            />
        </Grid>
        <Grid item lg={1} md={1} sm={3} xs={3}>
                <Field
                    id="marks"
                    label="Marks"
                    variant="standard"
                    handleFunc={handleMarks}
                    disabled={!evaluationMode && !isInstructor}
                    value={meta.marks>=0?meta.marks:"Not Checked"}
                    type={evaluationMode && isInstructor ? "number" : "name"}
                />
        </Grid>
        <Grid item lg={1} md={2} sm={2} xs={2}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    openImage(meta.imageUrl)
                }}>View Image</StyledLink>
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
            <StyledLink color={lightTheme.blue} onClick={isInstructor ? changeEvaluationMode : changeEditMode}>
                {editMode || evaluationMode ?"Update":"Edit"} {isInstructor ? "Marks" : "Submission"}
            </StyledLink>
        </Grid>
        {editMode ? <Grid item lg={2} md={2} sm={4} xs={4}>
                <form id="updateSubmissionForm">
                    <input
                        accept="image/*"
                        // className={classes.input}
                        name={"image"}
                        id={meta.id}
                        type="file"
                    />
                </form>
            </Grid> : null}
        {editMode || evaluationMode ? <Grid item lg={1} md={2} sm={4} xs={4}>
                <StyledLink color={lightTheme.blue} onClick={cancelUpdate}>Cancel Update</StyledLink>
            </Grid> : null}
    </Grid>
}
export default SubmissionElement;