import { useContext, useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { lightTheme } from "../constantManagement";
import {StyledLink } from "../globalElement";
import { fetchData } from "../fetchData";
import { Context } from "../context/contextProvider";

const CreateSubmissionDiv = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    background-color: ${lightTheme.dark};
`
const CreateSubmission = (props) => {
    const user = props.user;
    const task = props.task;
    const {storeTasks} = useContext(Context)
    const [loading,setLoading] = useState(false);
    const createSubmission = async () => {
        if(loading){
            return
        }else{
            setLoading(true)
        }
        let formData = new FormData(document.getElementById("createSubmissionForm"))
        formData.append("studentId",user.id);
        formData.append("taskId",task._id);
        console.log(user.id);
        console.log(task._id);
        console.log("nvjg")
        let createSubmissionDetails = await fetchData({
            method: "FORM",
            url: "/submission/createSubmission",
            jwToken: user.jwToken,
            body: formData
        })
        if(createSubmissionDetails.status){
            storeTasks();
        }else{
            console.log("fail to store")
        }
        setLoading(false)
    }
    
    return <CreateSubmissionDiv>
        <Grid container spacing={2}>
            <Grid item lg={2} md={2} sm={4} xs={4} >
                <form id="createSubmissionForm">
                    <input
                        accept="image/*"
                        name={"image"}
                        type="file"
                    />
                </form>
            </Grid>
            <Grid item lg={2} md={2} sm={3} xs={3}>
                <StyledLink color={lightTheme.blue} onClick={createSubmission}>
                    {loading ? "Creating..." : "Create Submission"}
                </StyledLink>
            </Grid>
        </Grid>
    </CreateSubmissionDiv>
}

export default CreateSubmission;