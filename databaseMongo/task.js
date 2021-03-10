const Task = require("../dbSchemaMongo/taskModel");
const GetImageUrl = require("../helper/imgb/getImageUrl");

exports.createTask = async (body,imageData) => {
    try {
        body.imageUrl = await taskImageUrl(imageData);
        if(body.imageUrl === null){
            throw Error("Error in uploading image")
        }
        const result = await Task.create(body);
        return {
            status: true,
            task: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.updateTask = async (taskId,updatedBody) => {
    try {
        if(updatedBody.submissionIds){
            throw Error("Submission ids cant be updated");
        }
        if(updatedBody.imageData){
            updatedBody.imageUrl = await taskImageUrl(updatedBody.imageData)
            if(updatedBody.imageUrl === null){
                throw Error("Error in uploading image");
            }
        }
        const result = await Task.findByIdAndUpdate(taskId,updatedBody,{new: true});
        return {
            status : true,
            task: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        } 
    }
}

exports.getTaskById = async (taskId) => {
    try {
        const task = await Task.findById(taskId).populate("instructorId","-password -taskIds -studentIds");
        return {
            status: true,
            task: task
        }

    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.getAllTaskByInstructorId = async (instructorId) => {
    try {
        const result = await Task.find({
            instructorId: instructorId
        })
        return {
            status: true,
            taskArray: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.findTask = async (query) => {
    try {
        const taskArray = await Task.find(query);
        return {
            status: true,
            taskArray: taskArray
        }
    } catch (err) {
        return {
            status: false,
            errorMessage:  err.message
        }
    }
}

exports.getAllSubmission = async (taskId) => {
    try {
        const task = await Task.findById(taskId).populate("submissionIds").populate("submissionIds.studentId","-password");
        let submissionArray = task.submissionIds;
        return {
            status: true,
            submissionArray: submissionArray,
            instructorId: task.instructorId
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.insertSubmissionId = async (submissionId,taskId) => {
    try {
        const result = await Task.findByIdAndUpdate(taskId,{
            $push: {submissionIds: submissionId}
        })
        return {
            status: true,
            task: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.isAccepting = async (taskId) => {
    const task = await Task.findById(taskId).select({_id: 0,endDate: 1});
    if(Date.now() > task.endDate){
        return false
    }else{
        return true
    }
}

const taskImageUrl = async (imageData) => {
    return await GetImageUrl.getImageUrl(imageData);
}