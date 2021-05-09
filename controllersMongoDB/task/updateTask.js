const Task = require("../../databaseMongo/task")
const mongoose = require("mongoose")

exports.updateTask = async (req,res) => {
    let errorCode = 500
    try {
        let taskId = req.body.taskId;
        let body = req.body
        if(taskId===undefined || taskId===null){
            errorCode=400
            throw Error("Provide task Id");
        }
        if(!validInstructor(body.taskId,body.instructorId)){
            errorCode = 402;
            throw Error("correct instructor access is required")
        }
        let updatingbody = await validObject(req.body,req.file);
        const result = await Task.updateTask(taskId,updatingbody);
        
        if(result.status){
            res.status(200).json({
                status: true,
                data: {
                    updatedTask:result.task
                }
            })
        }else{
            throw Error(result.errorMessage);
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

const validObject = async (updatingBody,file) => {
    let object = {}
    if(updatingBody.level !== undefined && updatingBody.level !== null){
        object["level"] = updatingBody.level
    }
    if(updatingBody.endDate !== undefined && updatingBody.endDate !== null){
        object["endDate"] = updatingBody.endDate
    }
    if(updatingBody.explanation !== undefined && updatingBody.explanation !== null){
        object["explanation"] = updatingBody.explanation
    }
    if(updatingBody.taskName !== undefined && updatingBody.taskName!==null){
        object["taskName"] = updatingBody.taskName
    }
    try {
        object["imageData"] = await file.buffer.toString("base64");
    } catch (err) {
        console.log("task image is not updating")
    }
    return object
}

const validInstructor = async (taskId,instructorId) => {
    const taskDetail = await Task.getTaskById(taskId);
    if(taskDetail.status){
        if(taskDetail.task.instructorId === mongoose.Types.ObjectId(instructorId)){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}