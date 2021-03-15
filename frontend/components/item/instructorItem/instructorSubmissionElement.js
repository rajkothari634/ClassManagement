import styled from "styled-components";
import { lightTheme } from "../../constantManagement";
import SubmissionElement from "../submissionElement";


const InstructorSubmissionElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark};
    border-radius: 8px;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.borderColor};
`

const InstructorSubmissionElement = (props) => {
    let user = props.user;
    let submission = props.submission;
    const getBorderColor = () => {
        if(submission.marks===-1){
            if(submission.taskId.endDate <= Date.now()){
                return lightTheme.red
            }else{
                return lightTheme.dark
            }
        }else{
            return lightTheme.green
        }
    }

    return <InstructorSubmissionElementDiv key={submission._id+"div"} borderColor={getBorderColor()}>
        <SubmissionElement key={submission._id} user={user} submission={submission} />
    </InstructorSubmissionElementDiv>
}

export default InstructorSubmissionElement;