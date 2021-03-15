const Submission = require("../../databaseMongo/submission");
const { getTaskById } = require("../../databaseMongo/task");
const mongoose = require("mongoose")
exports.putMarks = async (req,res) => {
    let errorCode = 500;
    try {
        const body = req.body;
        if(body.submissionId === undefined || body.submissionId === null || body.marks === undefined || body.marks === null){
            errorCode = 400
            throw Error("requested body is wrong")
        }
        if(! (await validInstructor(body.submissionId,req.body.instructorId))){
            errorCode = 402
            throw Error("Submission does not belong to your task");
        }
        const submissionDetail = await Submission.putMarks(body.submissionId,body.marks);
        if(submissionDetail.status){
            res.status(200).json({
                status: true,
                data: {
                    submissionId: body.submissionId,
                    marks: body.marks
                }
            })
        }else{
            throw Error(submissionDetail.errorMessage)
        }
    } catch (err) {
        console.log(err)
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}
const validInstructor = async (submissionId,instructorId) => {
    const submissionDetail = await Submission.getSubmissionById(submissionId);
    if(submissionDetail.status){
        let taskId = submissionDetail.submission.taskId;
        const taskDetail = await getTaskById(taskId);
        if(taskDetail.status){
            if(taskDetail.task.instructorId._id.toString() === instructorId){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
}