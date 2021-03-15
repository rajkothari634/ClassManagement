import React, { createContext, useState} from 'react';
import { fetchData } from "../fetchData";
import { deleteCookie, getCookie } from "../cookie";
import Router from "next/router"
export const Context = createContext();

const ContextProvider = (props) => {
    const [user,setUser] = useState({});
    const [tasks,setTasks] = useState([]);
    const [instructors,setInstructors] = useState([]);
    const [students,setStudents] = useState([]);
    const [submissions,setSubmissions] = useState([]);
    const [alert,setAlert] = useState({})
    const storeUser = () => {
        if (!user.email || !user.role || !user.jwToken) {
            let {email,role,jwToken,name,id} = getUserCredential();
            if (!email || !role || !jwToken || !name || !id) {
              Router.push("/auth");
            } else {
              setUser({
                email: email,
                role: role,
                jwToken: jwToken,
                name: name,
                id: id
              });
              //call required function to get things about user
              return {
                email: email,
                role: role,
                jwToken: jwToken,
                name: name,
                id: id
              }
            }
        }else{
              //call required function to get things about user
              return user;
        }
    }
    const storeTasks = async () => {
      storeAlert({})
      let userData = user; 
      if(userData.jwToken===undefined || userData.jwToken === null || userData.id===undefined || userData.id === null){
        storeUser();
        userData = getUserCredential();
        //need to change 
      }
      let fetchedTasksDetail = await fetchData({
        method: "GET",
        url: "/"+userData.role+"/getAllTask",
        jwToken: userData.jwToken,
        parameter: {
          id: userData.id
        }
      });
      if(fetchedTasksDetail.status){
        let taskArray = []
        if(userData.role==="student"){
          let taskHashMap = fetchedTasksDetail.data.taskHashMap;
        
          for(let key in taskHashMap){
            let task = taskHashMap[key];
            task.endDate = new Date(task.endDate);
            taskArray.push(taskHashMap[key])
          }
          setTasks(taskArray);
        }else{
          
          for(let i=0;i<fetchedTasksDetail.data.taskArray;i++){
            fetchedTasksDetail.data.taskArray[i].endDate = new Date(fetchedTasksDetail.data.taskArray[i].endDate);
          }
          setTasks(fetchedTasksDetail.data.taskArray)
        }
      }else{
        storeAlert({
          status: false,
          message: "FAILED TO GET TASKS"
        })
      }
    }
    const storeInstructors = async () => {
      storeAlert({})
      let userData = user;
      if(user.jwToken===undefined || user.jwToken === null || user.id===undefined || user.id === null){
        storeUser();
        userData = getUserCredential();
      }
      let fetchedInstructorsDetail = await fetchData({
        method: "GET",
        url: "/student/getAllInstructor",
        jwToken: userData.jwToken,
        parameter: {
          id: userData.id
        }
      });
      if(fetchedInstructorsDetail.status){
        let instructorArray = fetchedInstructorsDetail.data.instructorArray;
        setInstructors(instructorArray)
      }else{
        storeAlert({
          status: false,
          message: "FAILED TO GET INSTRUCTORS"
        })
      }
    }
    const storeStudents = async () => {
      storeAlert({})
      let userData = user; 
      if(userData.jwToken===undefined || userData.jwToken === null || userData.id===undefined || userData.id === null){
        storeUser();
        userData = getUserCredential();
      }
      let fetchedStudentsDetail = await fetchData({
        method: "GET",
        url: "/instructor/getAllStudent",
        jwToken: userData.jwToken,
        parameter: {
          id: userData.id
        }
      });
      if(fetchedStudentsDetail.status){
        let studentArray = fetchedStudentsDetail.data.studentArray;
        setStudents(studentArray);
      }else{
        storeAlert({
          status: false,
          message: "FAILED TO GET STUDENTS"
        })
      }

    }
    const storeSubmissions = async () => {
      storeAlert({})
      let userData = user; 
      if(userData.jwToken===undefined || userData.jwToken === null || userData.id===undefined || userData.id === null){
        storeUser();
        userData = getUserCredential();
      }
      let fetchedSubmissionsDetail = await fetchData({
        method: "GET",
        url: "/instructor/getAllSubmission",
        jwToken: userData.jwToken,
        parameter: {
          id: userData.id
        }
      });
      if(fetchedSubmissionsDetail.status){
        for(let i=0;i<fetchedSubmissionsDetail.data.submissionArray.length;i++){
          fetchedSubmissionsDetail.data.submissionArray[i].taskId.endDate = new Date(fetchedSubmissionsDetail.data.submissionArray[i].taskId.endDate)
        }
        let submissionArray = fetchedSubmissionsDetail.data.submissionArray;
        setSubmissions(submissionArray);
      }else{
        storeAlert({
          status: false,
          message: "FAILED TO GET SUBMISSION"
        })
      }
    }
    const clearData = async () => {
      deleteCookie("email");
      deleteCookie("name");
      deleteCookie("role");
      deleteCookie("jwToken");
      deleteCookie("id");
      setUser({})
      setTasks([])
      setInstructors([]);
      setStudents([]);
      setSubmissions([]);

    }
    const storeAlert = async (data) => {
      setAlert({
        ...data
      })
    }
    return <Context.Provider value={{user, storeUser, tasks, storeTasks, instructors, storeInstructors, 
              students, storeStudents, submissions, storeSubmissions, alert, storeAlert, clearData}}>
        {props.children}
    </Context.Provider>
}

const getUserCredential = () => {
  let email = getCookie("email");
  let role = getCookie("role");
  let jwToken = getCookie("jwToken");
  let name = getCookie("name")
  let id = getCookie("id")
  return {
    email: email,
    role: role,
    jwToken: jwToken,
    name: name,
    id: id
  }
}

export default ContextProvider;