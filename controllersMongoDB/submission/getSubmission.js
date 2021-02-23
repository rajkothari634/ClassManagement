const Submission = require("../../databaseMongo/submission")

exports.getSubmission = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["id"]===undefined || req.query["id"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        const submissionDetail = await Submission.getSubmissionById(req.query["id"]);
        if(submissionDetail.status){
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
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}