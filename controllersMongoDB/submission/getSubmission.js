const Submission = require("../../databaseMongo/submission")
const mongoose = require("mongoose")
exports.getSubmission = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["submissionId"]===undefined || req.query["submissionId"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        const submissionDetail = await Submission.getSubmissionById(req.query["submissionId"]);
        
        if(submissionDetail.status){
            if(submissionDetail.submission.studentId.toString()!==req.query["id"]){
                errorCode = 402;
                throw Error("submission does not belong to student")
            }
            res.status(200).json({
                status: true,
                data: {
                    submission: submissionDetail.submission
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