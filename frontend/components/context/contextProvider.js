import React, { createContext, useState} from 'react';
import { fetchData } from "../fetchData";
import { getCookie } from "../cookie";
import Router from "next/router"
export const Context = createContext();

const ContextProvider = (props) => {
    const [user,setUser] = useState({});
    const [tasks,setTasks] = useState([]);
    const [instructors,setInstructors] = useState([]);
    
    const storeUser = (data) => {
        if (!user.email || !user.role || !user.jwToken) {
            let email = getCookie("email");
            let role = getCookie("role");
            let jwToken = getCookie("jwToken");
            let name = getCookie("name")
            let id = getCookie("id")
            if (!email || !role || !jwToken || !name) {
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
            }
        }else{
              //call required function to get things about user
        }
    }
    const storeTasks = async () => {
      if(user.jwToken===undefined || user.jwToken === null || user.id===undefined || user.id === null){
        storeUser();
        //need to change 
        setTasks([])
        return;
      }
      console.log("student task")
      let fetchedTasksDetail = await fetchData({
        method: "GET",
        url: "/student/getAllTask",
        jwToken: user.jwToken,
        parameter: {
          id: user.id
        }
      });
      if(fetchedTasksDetail.status){
        let taskHashMap = fetchedTasksDetail.data.taskHashMap;
        let taskArray = []
        for(let key in taskHashMap){
          let task = taskHashMap[key];
          task.endDate = new Date(task.endDate);
          taskArray.push(taskHashMap[key])
        }
        setTasks(taskArray);
        console.log(taskArray)
      }
      console.log("kforit")
      console.log(fetchedTasksDetail)
    }

    const storeInstructors = async () => {
      console.log("started")
      if(user.jwToken===undefined || user.jwToken === null || user.id===undefined || user.id === null){
        console.log(user)
        storeUser();
        setInstructors([])
        console.log("inside empty user")
        return;
      }
      console.log("user not empty")
      let fetchedInstructorsDetail = await fetchData({
        method: "GET",
        url: "/student/getAllInstructor",
        jwToken: user.jwToken,
        parameter: {
          id: user.id
        }
      });
      console.log("qwer")
      if(fetchedInstructorsDetail.status){
        let instructorArray = fetchedInstructorsDetail.data.instructorArray;
        setInstructors(instructorArray)
        console.log(instructorArray)
      }
      console.log("completed")
    }


    return <Context.Provider value={{user, storeUser, tasks, storeTasks, instructors, storeInstructors}}>
        {props.children}
    </Context.Provider>
}

export default ContextProvider;