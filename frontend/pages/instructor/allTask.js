import {useState, useEffect,useContext} from 'react';
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import React from 'react'
import {SelectField, Col} from "../../components/globalElement"
import { lightTheme } from '../../components/constantManagement';
import FlatList from "flatlist-react";
import Layout from '../../components/layout';
import InstructorTaskElement from "../../components/item/instructorItem/instructorTaskElement"
import {Context} from "../../components/context/contextProvider";
import CreateTask from '../../components/create/createTask';
const InstructorTaskDiv = styled(Col)`
    width: 99vw;
    align-items: center;
    min-height: calc(100vh-60)px;
    background-color: ${lightTheme.background};
`
const TaskType = [
    {label: "All",value:"all"},
    {label: "Remaining",value:"remaining"},
    {label: "Expired",value: "expired"}
]
const Task = (props) => {
    const [meta, setMeta] = useState({
        taskType: "all"
    });
    const { user,tasks,storeTasks,storeUser} = useContext(Context);
    useEffect(()=>{
        storeTasks();
    },[user]);
    const getFilterTasks = (tasks) =>{
        if(meta.taskType==="all"){
            return tasks
        }
        return tasks
    }
    return <Layout>
        <InstructorTaskDiv>
            <Grid container spacing={2} style={{marginTop: "50px",padding: "2%"}}>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                    <CreateTask user={user}/>
                </Grid>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                    <FlatList
                        list={ getFilterTasks(tasks)}
                        renderItem={(item) => (
                            <InstructorTaskElement
                                user={user}
                                task={item}
                            />
                        )}
                        renderWhenEmpty={() => <div><center>Loading...</center></div>}
                    /> 
                </Grid>
            </Grid>
        </InstructorTaskDiv>
    </Layout>
}


export default Task;