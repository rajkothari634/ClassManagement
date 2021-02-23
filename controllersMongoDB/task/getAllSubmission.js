const Task = require("../../databaseMongo/task")

exports.getAllSubmission = async (req,res) => {
    let errorCode = 500
    try {
        let taskId = req.query["taskId"];
        let submissionDetail = await Task.getAllSubmission(taskId);
        if(submissionDetail.status){
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