const Instructor = require("../dbSchemaMongo/instructorModel");
const bcrypt = require("bcrypt");

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

exports.findInstructorById = async (id) => {
    try {
        let instructor = await Instructor.findById(id).populate("taskIds").populate("studentIds", '-password');

        if(instructor){
            return {
                status: true,
                instructor: instructor
            }
        }else{
            return {
                status: false
            }
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
            $push: {studentIds : studentId}
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