import styled from "styled-components";
import { lightTheme } from "../../constantManagement";
import TaskElement from "../taskElement"

const InstructorTaskElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark};
    border-radius: 10px;
    padding: 10px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const InstructorTaskElement = (props) => {
    let user = props.user;
    let task = props.task;

    return <InstructorTaskElementDiv key={task._id+"div"}>
        <TaskElement key={task._id} user={user} task={task} />
    </InstructorTaskElementDiv>
}

export default InstructorTaskElement;