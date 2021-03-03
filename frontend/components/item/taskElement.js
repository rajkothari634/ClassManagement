import styled from "styled-components";
import { lightTheme } from "../constantManagement";

const TaskElementDiv = styled.div`
    width: 100%;
    background-color: ${lightTheme.dark}
    height: 60px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.borderColor};
`

const TaskElement = (props) => {
    return <TaskElementDiv>

    </TaskElementDiv>
}

export default TaskElement;