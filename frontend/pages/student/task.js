import {useState, useContext} from 'react';
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import React from 'react'
import {SelectField, Col} from "../../components/globalElement"
import { lightTheme, UserLabel } from '../../components/constantManagement';
import TaskElement from "../../components/item/taskElement";
import Layout from '../../components/layout';
import {Context} from "../../components/context/contextProvider";
const TaskDiv = styled(Col)`
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

const Task = (props) => {
    const [meta, setMeta] = useState({});
    const { user, storeUser} = useContext(Context)
    const handleMeta = (event, error) => {
        setMeta({
            ...meta,
            [event.target.id]: event.target.value,
        })
        console.log({
            ...meta,
            [event.target.id]: event.target.value,
        })
    }
    return <Layout>
      <TaskDiv>
        <Grid container spacing={2} style={{width:"95%",marginTop:"50px"}}>
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
                    list={getFilterProduct(allProductData,filter)}
                    renderItem={(item) => (
                        <TaskElement
                            key={item._id}
                            user={user}
                        />
                    )}
                    renderWhenEmpty={() => <div><center>Loading...</center></div>}
                /> 
            </Grid>
        </Grid>
      </TaskDiv>
    </Layout> 
}

export default Task;