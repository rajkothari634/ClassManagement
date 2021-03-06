import styled from "styled-components";
import { lightTheme } from "../../constantManagement";
import TaskElement from "./taskElement"
import SubmissionElement from "./submissionElement"

const StudentTaskElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark};
    border-radius: 10px;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.borderColor};
`

const StudentTaskElement = (props) => {
    let user = props.user;
    let task = props.task;
    
    let submission = props.task.submission;
    const getBorderColor = () => {
        console.log("border color");
        console.log(typeof task.endDate)
        if((submission===undefined || submission === null) && task.endDate > Date.now()){
            return lightTheme.dark
        }
        if((submission===undefined || submission === null) && task.endDate <= Date.now()){
            return lightTheme.red;
        }
        if(submission!==undefined && submission !== null){
            return lightTheme.green;
        }
        return "#000000";
    }
    
    return <StudentTaskElementDiv key={task._id+"div"} borderColor={getBorderColor()}>
        <TaskElement key={task._id} user={user} task={task} />
        {submission!==undefined&&submission!==null ? <SubmissionElement key={submission._id} user={user} submission={submission}/> : null }
    </StudentTaskElementDiv>
}

export default StudentTaskElement;