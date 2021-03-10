const Submission = require("../../databaseMongo/submission")
const mongoose = require("mongoose")
exports.updateSubmission = async (req,res) => {
    let errorCode = 500;
    console.log("koip")
    try {
        const body = req.body;
        const file = req.file;
        let imageData = req.file.buffer.toString("base64");
        if(!isValid(body,file)){
            errorCode = 400;
            throw Error("requested field are incorrect")
        }
        if(!validStudent(body.submissionId,body.studentId)){
            errorCode = 402;
            throw Error("correct student access is required")
        }
        const updatedSubmission = await Submission.updateSubmission(body.submissionId, imageData)
        if(updatedSubmission.status){
            res.status(200).json({
                status:true,
                data:{
                    updatedSubmission: updatedSubmission.submission
                }
            })
        }else{
            throw Error(updatedSubmission.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}

const isValid = async (body,file) => {
    if(body.submissionId === undefined || body.submissionId===null){
        return false
    }
    if(file === undefined || file === null || file.buffer === undefined || file.buffer === null){
        return false
    }
    return true;
}

const validStudent = async (submissionId,studentId) => {
    const submissionDetail = await Submission.getSubmissionById(submissionId);
    if(submissionDetail.status){
        if(submissionDetail.submission.studentId === mongoose.Types.ObjectId(studentId)){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}