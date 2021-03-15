import {useState, useEffect,useContext} from 'react';
import { lightTheme } from '../../components/constantManagement';
import {Context} from "../../components/context/contextProvider";
import Layout from '../../components/layout';
import FlatList from "flatlist-react";
import styled from "styled-components"
import { Col } from '../../components/globalElement';
import { Grid } from '@material-ui/core';
import InstructorElement from "../../components/item/instructorElement"

const InstructorDiv = styled(Col)`
    width: 99vw;
    align-items: center;
    min-height: calc(100vh-60)px;
    background-color: ${lightTheme.background};
`
const AllInstructor = (props) => {
    const {user,storeUser,instructors, storeInstructors} = useContext(Context);
    useEffect(()=>{
        console.log("calling set instructor")
        storeInstructors()
    },[])
    const getFilterInstructors = (instructors) => {
        return instructors
    }
    return <div>
        <Layout>
            <InstructorDiv>
                <Grid container spacing={2} style={{marginTop:"50px",padding:"2%"}}>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                        <FlatList
                            list={ getFilterInstructors(instructors)}
                            renderItem={(item) => (
                                <InstructorElement
                                    user={user}
                                    key={item._id}
                                    instructor={item}
                                />
                            )}
                            renderWhenEmpty={() => <div><center>Loading...</center></div>}
                        /> 
                    </Grid>
                </Grid>
            </InstructorDiv>
        </Layout>
    </div>
}

export default AllInstructor