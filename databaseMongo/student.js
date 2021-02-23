const Student = require("../dbSchemaMongo/studentModel");

exports.createStudent = async (body) => {
    try {
        body.password = await encodePassword(body.password);
        const result = await Student.create(body);
        return {
            status: true,
            student: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

const encodePassword = async (password) => {
    return password
}

exports.findStudentById = async (id) => {
    try {
        const student = await Student.findById(id).populate("instructorIds","-password").populate("submissionIds");
        if(student){
            return {
                status: true,
                student: student
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

exports.findStudent = async (query) => {
    try {
        const studentArray = await Student.find(query);
        return {
            status: true,
            studentArray: studentArray
        }
    } catch (err) {
        return {
            status: false,
            errorMessage:  err.message
        }
    }
}

exports.checkStudent = async (emailId,password) => {
    try {
        password = await encodePassword(password);
        const student = await this.findStudent({
            emailId: emailId
        })
        .then(body => {
            if(body.status && body.studentArray.length === 1){
                if(body.studentArray[0].password === password){
                    return {
                        status: true,
                        student: body.studentArray[0]
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

exports.insertSubmissionId = async (submissionId,studentId) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId,{
            $push: {submissionIds : submissionId}
        })
        if(updatedStudent){
            return {
                status: true,
                updated: updatedStudent
            }
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.insertInstructorId  = async (studentId,instructorId) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId,{
            $push: {instructorIds : instructorId}
        })
        console.log(updatedStudent)
        if(updatedStudent){
            return {
                status: true,
                updated: updatedStudent
            }
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}