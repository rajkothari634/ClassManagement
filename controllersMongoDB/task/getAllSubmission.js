const Task = require("../../databaseMongo/task")
const mongoose= require("mongoose")
exports.getAllSubmission = async (req,res) => {
    let errorCode = 500
    try {
        let taskId = req.query["taskId"];
        let submissionDetail = await Task.getAllSubmission(taskId);
        if(submissionDetail.status){
            if(submissionDetail.instructorId.toString()!==req.query["id"]){
                errorCode = 402;
                throw Error("task is created by other instructor")
            }
            res.status(200).json({
                status: true,
                data: {
                    submissionArray: submissionDetail.submissionArray
                }
            })
        }else{
            errorCode = 400
            throw Error(submissionDetail.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}