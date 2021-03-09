import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Row,Col,CompanyLogo} from "./globalElement";
import {device,lightTheme,logoLink} from "./constantManagement";
import Link from "next/link";
import Router from "next/router";
import { deleteCookie } from "./cookie";
import { useContext } from "react";
import { Context } from "./context/contextProvider";

const HeaderContainer = styled(Col)`
  width: 99vw;
  min-height: 60px;
  align-item:center;
  background-color: ${lightTheme.dark};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
  }
`;
const Div = styled(Row)`
  height: 60px;
  justify-content: center;
  align-items: center;
  width: 80vw;
  @media ${device.mobileL} {
    justify-content: flex-end;
    width: 20vw;
  }
`;
const NavDiv = styled(Row)`
  align-items: center;
  flex-wrap: wrap;
  padding-left: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  @media ${device.mobileL} {
    width: 50vw;
    justify-content: flex-start;
    padding-left: 50px;
  }
`;
const NavListItem = styled.div`
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  font-family: Raleway, sans-serif;
  color: ${lightTheme.primary};
`;
const LinkDiv = styled.p`
  font-weight: bold;
  font-family: "Lucida Console", Courier, monospace;
  font-size: 15px;
  cursor: pointer;
  color: ${lightTheme.primary};
  transition: all 0.3s;
  &: hover {
    color: ${lightTheme.primary50};
  }
`

const Header = (props) => {
    const email = props.email;
    const name = props.name;
    const role = props.role;
    const {clearData} = useContext(Context);
    const logout = () => {
      clearData();
      Router.push("/auth")
    }
    let isInstructor = role==="student"?false:true;
    const linkToTask = !isInstructor ? "/student/studentTask" : "/instructor/allTask";
    const linkToInstructor = "/student/allInstructor";
    const linkToStudent = "/instructor/allStudent";
    const linkToSubmission = "/instructor/allSubmission"

    return <HeaderContainer>
      <Div>
        <CompanyLogo width={"100px"} src={logoLink}/>
      </Div>
      <NavDiv>
        <NavListItem>
          <Link href={linkToTask}><LinkDiv>TASK</LinkDiv></Link>
        </NavListItem>
        
        {isInstructor ? <NavListItem>
          <Link href={linkToStudent} ><LinkDiv>STUDENT</LinkDiv></Link>
        </NavListItem> : <NavListItem>
          <Link href={linkToInstructor}><LinkDiv>INSTRUCTOR</LinkDiv></Link>
        </NavListItem>}
        {isInstructor? <NavListItem>
          <Link href={linkToSubmission}><LinkDiv>SUBMISSION</LinkDiv></Link>
        </NavListItem>:null}
      </NavDiv>
      <Div>
        <LinkDiv onClick={() => {
          email!==undefined ? logout() : Router.push("/auth");
        }}>
          {email!==undefined ? "LOGOUT" : "LOGIN"}
        </LinkDiv>
      </Div>
    </HeaderContainer>
}

export default Header