import {useState, useEffect,useContext} from 'react';
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import React from 'react'
import {SelectField, Col} from "../../components/globalElement"
import { lightTheme, UserLabel } from '../../components/constantManagement';
import StudentTaskElement from "../../components/item/studentTaskItem/studentTaskElement";
import FlatList from "flatlist-react";
import Layout from '../../components/layout';
import {Context} from "../../components/context/contextProvider";
const StudentTaskDiv = styled(Col)`
    width: 99vw;
    align-items: center;
    min-height: calc(100vh-60)px;
    background-color: ${lightTheme.background};
`
const TaskType = [
    {label: "All",value:"all"},
    {label: "Completed",value:"completed"},
    {label: "Remaining",value: "remaining"},
    {label: "Expired",value: "expired"}
]

const StudentTask = (props) => {
    const [meta, setMeta] = useState({
        taskType: "all"
    });
    const { user,tasks,storeTasks,storeUser} = useContext(Context)

    useEffect(()=>{
        storeTasks();
    },[user]);
    const getFilterTasks = (tasks) =>{
        if(meta.taskType==="all"){
            return tasks
        }
        let filteredTasks = []
        switch(meta.taskType){
            case "completed":
                filteredTasks = getCompletedTasks(tasks);
                break;
            case "expired":
                filteredTasks = getExpiredTasks(tasks);
                break;
            case "remaining":
                filteredTasks = getRemainingTasks(tasks);
                break;
        }
        return filteredTasks
    }
    const getCompletedTasks = (tasks) => {
        let filteredTasks = []
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].submission!==undefined && tasks[i].submission!==null){
                filteredTasks.push(tasks[i]);
            }
        }
        return filteredTasks;
    }
    const getExpiredTasks = (tasks) => {
        let filteredTasks = []
        for(let i=0;i<tasks.length;i++){
            if((tasks[i].submission===undefined ||tasks[i].submission===undefined) && tasks[i].endDate <= Date.now()){
                filteredTasks.push(tasks[i]);
            }
        }
        return filteredTasks;
    }
    const getRemainingTasks = (tasks) => {
        let filteredTasks = []
        for(let i=0;i<tasks.length;i++){
            if((tasks[i].submission===undefined ||tasks[i].submission===undefined) && tasks[i].endDate > Date.now()){
                filteredTasks.push(tasks[i]);
            }
        }
        return filteredTasks;
    }
    const handleMeta = (event, error) => {
        setMeta({
            ...meta,
            [event.target.id]: event.target.value,
        })
    }
    return <Layout>
      <StudentTaskDiv>
        <Grid container spacing={2} style={{marginTop:"50px",padding:"2%"}}>
            <Grid item lg={2} md={2} sm={4} xs={4}>
                <SelectField
                    id="taskType"
                    label="Task Type"
                    handleFunc={handleMeta}
                    value={"all"}
                    options={TaskType}
                />
            </Grid>
            <Grid item lg={12} md={12} xs={12} sm={12}>
                <FlatList
                    list={ getFilterTasks(tasks)}
                    renderItem={(item) => (
                        <StudentTaskElement
                            user={user}
                            task={item}
                        />
                    )}
                    renderWhenEmpty={() => <div><center>Loading...</center></div>}
                /> 
            </Grid>
        </Grid>
      </StudentTaskDiv>
    </Layout> 
}

export default StudentTask;