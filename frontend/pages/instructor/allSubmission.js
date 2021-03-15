import Layout from "../../components/layout"
import Grid from "@material-ui/core/Grid";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../components/context/contextProvider";
import { lightTheme } from "../../components/constantManagement";
import InstructorSubmissionElement from "../../components/item/instructorItem/instructorSubmissionElement";
import { SelectField, Field } from "../../components/globalElement";
import FlatList from "flatlist-react";

const SubmissionDiv = styled.div`
    width: 99vw;
    align-items: center;
    min-height: calc(100vh-60)px;
    background-color: ${lightTheme.background};
`;
const submissionType = [
    {label: "All",value: "all"},
    {label: "Checked", value: "checked"},
    {label: "Unchecked", value: "unchecked"},
    {label: "Remaining",value: "remaining"} //endDate of task is not crossed
]

const Submission = () => {
    const {user,storeUser,submissions, storeSubmissions} = useContext(Context);
    const [meta,setMeta] = useState({
        submissionType: "all"
    })
    useEffect(()=>{
        storeSubmissions()
    },[user])
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
    const getFilterSubmissions = (submissions)=>{
        let filtered = []
        for(let i=0;i<submissions.length;i++){
            let submission = submissions[i];
            if( meta.taskName!==undefined && meta.taskName!==null && submission.taskId.taskName.toLowerCase().indexOf(meta.taskName.toLowerCase()) === -1){
                continue;
            }
            if(meta.submissionType!=="all"){
                console.log("not all")
                if(meta.submissionType==="checked" && submission.marks===-1){
                    continue;
                }
                if(meta.submissionType==="unchecked" && submission.taskId.endDate > Date.now() || submission.marks!==-1 ){
                    continue;
                }
                if(meta.submissionType==="remaining" && submission.taskId.endDate <= Date.now() || submission.marks!==-1){
                    continue;
                }
            }
            if(meta.endDate !== undefined && meta.endDate!==null && submission.taskId.endDate !== new Date(meta.endDate)){
                continue;
            }
            if( meta.studentName!==undefined && meta.studentName!==null && submission.studentId.studentName.toLowerCase().indexOf(meta.studentName.toLowerCase()) === -1){
                continue;
            }
            filtered.push(submission)
        }
        return filtered
    }
    return <Layout>
        <SubmissionDiv>
            <Grid container spacing={2} style={{marginTop:"50px",padding:"2%"}}>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                    <Field
                        id="taskName"
                        label="Task Name"
                        variant="standard"
                        handleFunc={handleMeta}
                        value={meta.taskName}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                    <Field
                        id="studentName"
                        label="Student Name"
                        variant="standard"
                        handleFunc={handleMeta}
                        value={meta.studentName}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                    <Field
                        id="endDate"
                        label="End Date"
                        variant="standard"
                        handleFunc={handleMeta}
                        value={meta.endDate}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={3} xs={3}>
                    <SelectField
                        id="submissionType"
                        label="Type"
                        variant="standard"
                        handleFunc={handleMeta}
                        value={meta.submissionType}
                        options={submissionType}
                    />
                </Grid>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                <FlatList
                    list={ getFilterSubmissions(submissions)}
                    renderItem={(item) => (
                        <InstructorSubmissionElement
                            key={item._id}
                            user={user}
                            submission={item}
                        />
                    )}
                    renderWhenEmpty={() => <div><center>Loading...</center></div>}
                /> 
            </Grid>
            </Grid>
        </SubmissionDiv>
    </Layout>
}

export default Submission;