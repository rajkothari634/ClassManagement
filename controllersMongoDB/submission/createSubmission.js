const { findStudentById } = require("../../databaseMongo/student");
const Submission = require("../../databaseMongo/submission");
const { getTaskById } = require("../../databaseMongo/task");

exports.createSubmission = async (req,res) => {
    let errorCode = 500
    try {
        let body = req.body;
        if(!isValid(body,req.file)){
            errorCode = 400
            throw Error("requested body is not valid")
        }
        let imageData = req.file.buffer.toString("base64");
        const submissionDetail = await Submission.createSubmission(body,imageData);
        if(submissionDetail.status){
            res.status(200).json({
                status: true,
                data:{
                    submission: submissionDetail.submission
                }
            })
        }else{
            errorCode = 400;
            throw Error(taskDetail.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}

const isValid = (body,file) => {
    if(file === undefined || file === null || file.buffer === undefined || file.buffer === null){
        return false
    }
    if(!isValidTask(body.taskId)){
        return false
    }
    if(!isValidStudent(body.studentId)){
        return false
    }
    return true
}

const isValidTask = async (taskId) => {
    const taskDetail = await getTaskById(taskId);
    return taskDetail.status
}

const isValidStudent = async (studentId) => {
    const studentDetail = await findStudentById(studentId);
    return studentDetail.status
}