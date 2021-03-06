import {useState, useEffect,useContext} from 'react';
import {Context} from "../../components/context/contextProvider";
import Layout from '../../components/layout';


const AllInstructor = (props) => {
    const {user,storeUser,instructors, storeInstructors} = useContext(Context);
    useEffect(()=>{
        console.log("calling set instructore")
        storeInstructors()
    },[])
    return <div>
        <Layout>
            
        </Layout>
    </div>
}

export default AllInstructor