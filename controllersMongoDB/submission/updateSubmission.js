const Submission = require("../../databaseMongo/submission")
exports.updateSubmission = async (req,res) => {
    let errorCode = 500;
    try {
        const body = req.body;
        const file = req.file;
        let imageData = req.file.buffer.toString("base64");
        if(!isValid(body,file)){
            errorCode = 400;
            throw Error("requested field are incorrect")
        }
        const updatedSubmission = await Submission.updateSubmission(body.submissionId, imageData)
        if(updatedSubmission.status){
            res.status(200).json({
                status:true,
                data:{
                    updatedSubmission: updatedSubmission
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