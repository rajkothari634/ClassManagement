const Submission = require("../../databaseMongo/submission")

exports.putMarks = async (req,res) => {
    let errorCode = 500;
    try {
        const body = req.body;
        if(body.submissionId === undefined || body.submissionId === null || body.marks === undefined || body.marks === null){
            errorCode = 400
            throw Error("requested body is wrong")
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
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}