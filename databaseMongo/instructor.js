const Instructor = require("../dbSchemaMongo/instructorModel");
const bcrypt = require("bcrypt");
const CreateJWT = require("../helper/jwToken/createJWToken");
var mongoose = require('mongoose'); 

exports.createInstructor = async (body) => {
    try {
        body.password = await encodePassword(body.password);
        const result = await Instructor.create(body);
        return {
            status: true,
            instructor: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

const encodePassword = async (password) => {
    return await bcrypt.hash(password, 12);
}
const comparePassword = async (correctPassword,providedPassword) => {
    return await bcrypt.compare(providedPassword,correctPassword);
}

exports.findInstructorById = async (data) => {
    try {
   
        let {id,fetchTaskDetail,fetchStudentDetail} = data;
        let instructor =  {}
        if(fetchTaskDetail===0&&fetchStudentDetail==0){
            instructor = await Instructor.findById(id);
        }else{
            instructor = await Instructor.findById(id).populate("taskIds").populate("studentIds", '-password');
        }
        if(instructor){
            return {
                status: true,
                instructor: instructor
            }
        }else{
            throw Error("instructor not found")
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.findInstructor = async (query) => {
    try {
        const instructorArray = await Instructor.find(query,"-password");
        return {
            status: true,
            instructorArray: instructorArray
        }
    } catch (err) {
        return {
            status: false,
            errorMessage:  err.message
        }
    }
}

exports.checkInstructor = async (emailId,password) => {
    try {
        password = await encodePassword(password);
        const instructor = await this.findInstructor({
            emailId: emailId
        })
        .then(body => {
            if(body.status && body.instructorArray.length === 1){
                if(body.instructorArray[0].password === password){
                    return {
                        status: true,
                        instructor: body.instructorArray[0]
                    }
                }else{
                    return {
                        status: false,
                        errorMessage: "Password is wrong"
                    }
                }
            }else{
                return {
                    status: false,
                    errorMessage: "Instructor not found"
                }
            }
        });
        return instructor
    } catch (err) {
        return {
            status: false,
            errorMessage:  err.message
        }
    }
}

exports.insertTaskId = async (instructorId,taskId) => {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId,{
            $push: {taskIds : taskId}
        })
        if(updatedInstructor){
            return {
                status: true,
                updated: updatedInstructor
            }
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.insertStudentId  = async (studentId,instructorId) => {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId,{
            $addToSet: {studentIds : studentId}
        },{new:true})
        if(updatedInstructor){
            return {
                status: true,
                updated: updatedInstructor
            }
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.login = async (email,password) => {
    try {
        const instructorArray = await Instructor.find({email:email});
        let instructor = instructorArray[0]
        if(instructor===undefined || instructor===null){
            throw Error("Instructor not found")
        }
        let passwordStatus = await comparePassword(instructor.password,password);
        if(passwordStatus){
            let jwToken = await CreateJWT.createJWToken({
                email: instructor.email,
                id: instructor._id,
                role: "instructor"
            })
            return {
                status: true,
                user:{
                    _id: instructor._id,
                    role: "instructor",
                    name: instructor.instructorName,
                    email: instructor.email,
                    jwToken: jwToken.jwToken
                }
            }
        }else{
            throw Error("password is wrong")
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}