import styled from "styled-components";
import {useState} from "react";
import CreateInstructorForm from "../components/form/createInstructorForm";
import Login from "../components/form/login"
import CreateStudentForm from "../components/form/createStudentForm";
import {ScreenDiv, SelectField, Field,Row, Col, CompanyLogo} from "../components/globalElement"
import {device, lightTheme,logoLink} from "../components/constantManagement"
import { Grid } from "@material-ui/core";

const AuthDiv = styled(Col)`
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: ${lightTheme.dark};
    @media ${device.tablet} {
        width: 30vw;
        min-width: 350px;
    } 
`
const UserRoleContainer = styled(Row)`
    width: 90%;
    height: 60px;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`
const UserRoleDiv = styled(Row)`
    width: 50%;
    height: 60px;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, ${props => props.selected ? 0.2 : 0.0});
    cursor: pointer;
    background-color: ${props => props.selected ? lightTheme.dark : lightTheme.transparent}
    color: ${props => props.selected ? lightTheme.primary50 : lightTheme.disabled}
`
const FormDiv = styled(Col)`
    width: 90%;
    margin-top: 50px;
`
let processLabel = [
    {label:"Login",value:"login"},
    {label:"Signup",value:"signup"}
]
const Auth = (props) => {
    const [roleSelected,setRoleSelected] = useState("instructor");
    const [processType,setProcessType] = useState("login")
    const selectUserRole = (role) => {
        console.log(role)
        setRoleSelected(role)
    }
    const selectProcessType = (event) => {
        setProcessType(event.target.value)
    }
    return <ScreenDiv backgroundColor={"#ff0000"}>
        <AuthDiv>
            <CompanyLogo width={"100px"} src={logoLink}/>
            <UserRoleContainer>
                <UserRoleDiv onClick={() => {
                    selectUserRole("instructor")
                }}
                 selected={roleSelected==="instructor" ? true : false}>
                    Instructor
                </UserRoleDiv>
                <UserRoleDiv onClick={() => {
                    selectUserRole("student")
                }}
                 selected={roleSelected==="student" ? true : false}>
                     Student
                </UserRoleDiv>
            </UserRoleContainer>
            <FormDiv>
                {processType==="signup" ? 
                 roleSelected==="instructor" ? 
                <CreateInstructorForm/> 
                : <CreateStudentForm/> : <Login role={roleSelected}/>}
            </FormDiv>
            <Grid style={{width:"90%",marginTop: "30px"}}>
                <SelectField
                    id="processType"
                    label="."
                    handleFunc={selectProcessType}
                    value={"login"}
                    options={processLabel}
                />
            </Grid>

        </AuthDiv>  
    </ScreenDiv>
}

export default Auth