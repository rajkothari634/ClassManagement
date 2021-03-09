import {useState, useEffect,useContext} from 'react';
import { lightTheme } from '../../components/constantManagement';
import {Context} from "../../components/context/contextProvider";
import Layout from '../../components/layout';
import FlatList from "flatlist-react";
import styled from "styled-components"
import { Col } from '../../components/globalElement';
import { Grid } from '@material-ui/core';
import StudentElement from "../../components/item/studentElement"

const StudentDiv = styled(Col)`
    width: 99vw;
    align-items: center;
    min-height: calc(100vh-60)px;
    background-color: ${lightTheme.background};
`
const AllStudent = (props) => {
    const {user,storeUser,students, storeStudents} = useContext(Context);
    useEffect(()=>{
        console.log("calling set student")
        storeStudents()
    },[])
    const getFilterStudents = (students) => {
        return students
    }
    return <div>
        <Layout>
            <StudentDiv>
                <Grid container spacing={2} style={{marginTop:"50px",padding:"2%"}}>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                        <FlatList
                            list={getFilterStudents(students)}
                            renderItem={(item) => (
                                <StudentElement
                                    user={user}
                                    key={item._id}
                                    student={item}
                                />
                            )}
                            renderWhenEmpty={() => <div><center>Loading...</center></div>}
                        /> 
                    </Grid>
                </Grid>
            </StudentDiv>
        </Layout>
    </div>
}

export default AllStudent