import { useState } from "react";
import styled from "styled-components";
import {fetchData} from "../../fetchData"
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../../constantManagement";
import {DisabledText,ViewImageLink, Field,SelectField} from "../../globalElement"

const SubmissionElementDiv = styled.div`
    width: 100%;
`;

const SubmissionElement = (props) => {
    const [meta,setMeta] = useState({
        updatedAt: props.submission.updatedAt,
        marks: props.submission.marks,
        studentId:props.submission.studentId,
        taskId: props.submission.taskId,
        imageUrl : props.submission.imageUrl,
        id: props.submission._id
    })
    const [loading,setLoading] = useState(false)
    let user = props.user;

    const [editMode,setEditMode] = useState(false);
    const [imageData,setImageData] = useState({})

    const openImage = (url) => {
        window.open(url)
    }
    const changeEditMode = async () => {
        if(editMode){
            if(loading){
                return
            }else{
                setLoading(true)
            }
            let formData = new FormData(formElem);
            formData.append('submissionId',meta.id)
            
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
            }
            console.log("yuio")
            console.log(updateSubmissionDetails)
            setLoading(false)
        }
        setEditMode(!editMode)
    }
    const cancelUpdate = () => {
        setEditMode(false)
    }
    return <SubmissionElementDiv>
        <DisabledText>Submission</DisabledText>
        <Grid container spacing={2}>
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
                    disabled={true}
                    value={meta.marks>=0?meta.marks:"Not Checked"}
                    type="name"
                />
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <ViewImageLink color={lightTheme.blue} onClick={() => {
                    openImage(meta.imageUrl)
                }}>View Image</ViewImageLink>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <ViewImageLink color={lightTheme.blue} onClick={() => {
                    changeEditMode()
                }}>{editMode?"Update":"Edit"} Submission</ViewImageLink>
            </Grid>
            {editMode ? <Grid item lg={2} md={2} sm={4} xs={4} >
                <form id="formElem">
                    <input
                        accept="image/*"
                        // className={classes.input}
                        name={"image"}
                        id={meta.id}
                        type="file"
                    />
                </form>
            </Grid> : null}
            {editMode ? <Grid item lg={2} md={2} sm={4} xs={4}>
                <ViewImageLink color={lightTheme.blue} onClick={() => {
                    cancelUpdate()
                }}>Cancel Submission Image</ViewImageLink>
            </Grid> : null}
        </Grid>
    </SubmissionElementDiv>
}
export default SubmissionElement;