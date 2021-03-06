import { useState } from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../../constantManagement";
import {DisabledText,ViewImageLink, Field,SelectField} from "../../globalElement"

const TaskElementDiv = styled.div`
    width: 100%;
`;
const ExplanationText = styled.p`
  color: ${lightTheme.black};
  height: 15px;
  font-size: 0.85em;
  margin-top: 0px;
  margin-bottom: 3px;
`

const TaskElement = (props) => {
    const [meta,setMeta] = useState({
        taskName: props.task.taskName,
        instructorName: props.task.instructorId.instructorName,
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
    const openImage = (url) => {
        window.open(url)
    }
    const isInstructor = props.user.role === "instructor" ? true : false;

    return <TaskElementDiv>
        <DisabledText>Task</DisabledText>
        <Grid container spacing={2}>
            <Grid item lg={3} md={2} sm={4} xs={4}>
                <Field
                    id="taskName"
                    label="Task Name"
                    variant="standard"
                    disabled={!isInstructor}
                    value={meta.taskName}
                    handleFunc={handleUpdatedMeta}
                    type="name"
                />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <Field
                    id="instructorName"
                    label="Instructor Name"
                    variant="standard"
                    disabled={true}
                    value={meta.instructorName}
                    type="name"
                />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <Field
                    id="createdAt"
                    label="Created At"
                    variant="standard"
                    disabled={true}
                    value={meta.createdAt}
                    type="name"
                />
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <Field
                    id="endDate"
                    label="End At"
                    variant="standard"
                    disabled={!isInstructor}
                    value={meta.endDate}
                    type="date"
                />
            </Grid>
            <Grid item lg={1} md={2} sm={4} xs={4}>
                {isInstructor ? <SelectField
                    id="level"
                    label="Level"
                    variant="standard"
                    disabled={false}
                    value={meta.level}
                    options={LevelLabel}
                />: <Field
                    id="level"
                    label="Level"
                    variant="standard"
                    disabled={true}
                    value={meta.level}
                    type={"name"}
                />}
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <ViewImageLink color={lightTheme.blue} onClick={() => {
                    openImage(meta.imageUrl)
                }}>View Task Image</ViewImageLink>
            </Grid>
            <Grid item style={{marginTop:"-15px"}} lg={12} md={12} sm={12} xs={12}>
                {isInstructor ? <Field
                    id="explanation"
                    label="Explanation"
                    variant="standard"
                    disabled={!isInstructor}
                    value={meta.explanation}
                    type="name"
                /> : <ExplanationText>{meta.explanation}</ExplanationText>}
            </Grid>
        </Grid>
    </TaskElementDiv>
}
export default TaskElement;