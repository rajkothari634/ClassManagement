import { useState } from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../constantManagement";
import {DisabledText, StyledLink, Field,SelectField} from "../globalElement"
import { fetchData } from "../fetchData";

const TaskElementDiv = styled.div`
    width: 100%;
`;
const ExplanationText = styled.p`
  color: ${lightTheme.black};
  font-size: 0.85em;
  margin-top: 0px;
  margin-bottom: 3px;
`

const TaskElement = (props) => {
    let user = props.user;
    const [meta,setMeta] = useState({
        taskName: props.task.taskName,
        id: props.task._id,
        instructorName: user.role === "instructor" ? user.name : props.task.instructorId.instructorName,
        createdAt: props.task.createdAt,
        endDate: props.task.endDate,
        imageUrl: props.task.imageUrl,
        level: props.task.level,
        explanation: props.task.explanation
    })
    const [updatedMeta,setUpdatedMeta] = useState({})
    const handleUpdatedMeta = (event,error) => {
        setUpdatedMeta({
            ...updatedMeta,
            [event.target.id]:event.target.value
        })
    }
    const [loading,setLoading] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const openImage = (url) => {
        window.open(url)
    }
    const isInstructor = user.role === "instructor" ? true : false;
    const changeEditMode = async () => {
        if(editMode){
            updateTask();
        }
        setEditMode(!editMode)
    }
    const updateTask = async () => {
        if(loading){
            return
        }else{
            setLoading(true)
        }
        let formData = new FormData(document.getElementById("updateTaskForm"));
        formData.append('taskId',meta.id);
        for(let key in updatedMeta){
            formData.append(key,updatedMeta[key]);
        }
        
        let updateTaskDetails = await fetchData({
            method: "FORM",
            url:"/task/updateTask",
            jwToken: user.jwToken,
            body: formData
        });
        if(updateTaskDetails.status){
            let udpatedObject = {
                ...meta,
                ...updatedMeta
            }
            if(updateTaskDetails.data.updatedTask.imageUrl!==undefined||updateTaskDetails.data.updatedTask.imageUrl!==null){
                udpatedObject["imageUrl"] = updateTaskDetails.data.updatedTask.imageUrl;
            }
            setMeta(udpatedObject)
        }
        setLoading(false)
    }
    const cancelUpdate = () => {
        setEditMode(false)
    }
    return <TaskElementDiv>
        
        <Grid container spacing={1} justify={"space-between"}>
            <Grid item lg={2} md={2} sm={3} xs={4}>
                <Field
                    id="taskName"
                    label="Task Name"
                    variant="standard"
                    disabled={!isInstructor || !editMode}
                    value={meta.taskName}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />
            </Grid>
            {!isInstructor ? <Grid item lg={2} md={2} sm={3} xs={4}>
                <Field
                    id="instructorName"
                    label="Instructor Name"
                    variant="standard"
                    disabled={true}
                    value={meta.instructorName}
                    type="name"
                />
            </Grid> : null}
            <Grid item lg={1} md={2} sm={3} xs={4}>
                <Field
                    id="createdAt"
                    label="Created At"
                    variant="standard"
                    disabled={true}
                    value={meta.createdAt}
                    type="name"
                />
            </Grid>
            <Grid item lg={1} md={2} sm={3} xs={4}>
                {editMode && isInstructor ? <Field
                    id="endDate"
                    label="End At"
                    variant="standard"
                    disabled={false}
                    value={meta.endDate}
                    handleFunc={handleUpdatedMeta}
                    type="date"
                />:<Field
                id="endDate"
                label="End At"
                variant="standard"
                disabled={true}
                value={meta.endDate}
                type="name"
            />}
            </Grid>
            <Grid item lg={1} md={2} sm={3} xs={4}>
                {isInstructor && editMode ? <SelectField
                    id="level"
                    label="Level"
                    variant="standard"
                    disabled={false}
                    value={meta.level}
                    options={LevelLabel}
                    handleFunc={handleUpdatedMeta}
                />: <Field
                    id="level"
                    label="Level"
                    variant="standard"
                    disabled={true}
                    value={meta.level}
                    type={"name"}
                />}
            </Grid>
            <Grid item lg={1} md={2} sm={3} xs={4}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    openImage(meta.imageUrl)
                }}>View Image</StyledLink>
            </Grid>
            {isInstructor ? <Grid item lg={1} md={2} sm={3} xs={2}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    changeEditMode()
                }}>{editMode?"Update":"Edit"} Task</StyledLink>
            </Grid> : null}
            {editMode ? <Grid item lg={2} md={2} sm={3} xs={4} >
                <form id="updateTaskForm">
                    <input
                        accept="image/*"
                        name={"image"}
                        id={meta.id}
                        type="file"
                    />
                </form>
            </Grid> : null}
            {editMode ? <Grid item lg={1} md={2} sm={3} xs={4}>
                <StyledLink color={lightTheme.blue} onClick={() => {
                    cancelUpdate()
                }}>Cancel Update</StyledLink>
            </Grid> : null}
            <Grid item lg={12} md={12} sm={12} xs={12}>
                {isInstructor ? <Field
                    id="explanation"
                    label="Explanation"
                    variant="standard"
                    disabled={!isInstructor || !editMode}
                    value={meta.explanation}
                    type="name"
                    multiline={true}
                    handleFunc={handleUpdatedMeta}
                /> : <ExplanationText>{meta.explanation}</ExplanationText>}
            </Grid>
        </Grid>
    </TaskElementDiv>
}
export default TaskElement;