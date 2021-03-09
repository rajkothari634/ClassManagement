import { useContext, useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { lightTheme, LevelLabel } from "../constantManagement";
import { Field, SelectField, StyledLink } from "../globalElement";
import { fetchData } from "../fetchData";
import { Context } from "../context/contextProvider";

const CreateTaskDiv = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    background-color: ${lightTheme.dark};
`
const CreateTask = (props) => {
    const user = props.user;
    const [meta,setMeta] = useState({
        level: "Beginner"
    });
    const {storeTasks} = useContext(Context)
    const [loading,setLoading] = useState(false);
    const handleMeta = (event,error) => {
        setMeta({
            ...meta,
            [event.target.id]: event.target.value
        })
    }
    const isValid = () => {
        if(meta.taskName===undefined || meta.taskName===null){
            return false;
        }
        if(meta.explanation===undefined || meta.explanation===null){
            return false;
        }
        if(meta.level===undefined || meta.level===null){
            return false;
        }
        if(meta.endDate===undefined || meta.endDate===null){
            return false;
        }
        return true;
    }
    const createTask = async () => {
        if(loading){
            return
        }else{
            setLoading(true)
        }
        if(!isValid()){
            return 
        }
        let formData = new FormData(document.getElementById("createTaskForm"));
        formData.append("instructorId",user.id);
        formData.append("taskName",meta.taskName);
        formData.append("explanation",meta.explanation);
        formData.append("level",meta.level);
        formData.append("endDate",meta.endDate);
        let createTaskDetails = await fetchData({
            method: "FORM",
            url: "/task/createTask",
            jwToken: user.jwToken,
            body: formData
        })
        if(createTaskDetails.status){
            storeTasks();
            setMeta({
                level: "Beginner"
            })
        }else{
            console.log("fail to store")
        }
        setLoading(false)
    }
    
    return <CreateTaskDiv>
        <Grid container spacing={2} justify={"space-between"}>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <Field
                    id="taskName"
                    label="Task Name"
                    value={meta.taskName}
                    handleFunc={handleMeta}
                    type="name"
                />
            </Grid>

            <Grid item lg={2} md={2} sm={4} xs={4}>
                <Field
                    id="endDate"
                    label="End At"
                    value={meta.endDate}
                    handleFunc={handleMeta}
                    type="date"
                />
            </Grid>
            
            <Grid item lg={1} md={2} sm={3} xs={4}>
                <SelectField
                    id="level"
                    label="Level"
                    value={meta.level}
                    options={LevelLabel}
                    handleFunc={handleMeta}
                />
            </Grid>
            
            <Grid item lg={2} md={2} sm={4} xs={4} >
                <form id="createTaskForm">
                    <input
                        accept="image/*"
                        name={"image"}
                        type="file"
                    />
                </form>
            </Grid>
            
            <Grid item lg={2} md={2} sm={3} xs={3}>
                <StyledLink color={lightTheme.blue} onClick={createTask}>
                    {loading ? "Creating.." : "Create Task"}
                </StyledLink>
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Field
                    id="explanation"
                    label="Explanation"
                    value={meta.explanation}
                    type="name"
                    multiline={true}
                    handleFunc={handleMeta}
                />
            </Grid>
        </Grid>
    </CreateTaskDiv>
}

export default CreateTask;