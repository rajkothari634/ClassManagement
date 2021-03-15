const Submission = require("../dbSchemaMongo/submissionModel");
const GetImageUrl = require("../helper/imgb/getImageUrl");
const Task = require("./task");
const Student = require("./student");

exports.createSubmission = async (body,imageData) => {
    try {
        if(!Task.isAccepting(body.taskId)){
            return {
                status: false,
                errorMessage: "Submission date passed."
            }
        }
        body.imageUrl = await submissionImageUrl(imageData);
        if(body.imageUrl === null){
            throw Error("Error in uploading image")
        }
        const submission = await Submission.create(body);
        const taskUpdated = await Task.insertSubmissionId(submission._id,submission.taskId);
        const studentUpdated = await Student.insertSubmissionId(submission._id,submission.studentId);
        return {
            status: true,
            submission: submission
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.updateSubmission = async (submissionId,imageData,taskId) => {
    try {
        //tasId is not necessary
        const imageUrl = await submissionImageUrl(imageData);
        if(imageUrl === null){
            throw Error("Error in uploading image")
        }
        let submission;
        if(taskId===undefined || taskId === null){
            submission = await Submission.findById(submissionId);
            taskId = submission.taskId;
        }
        if(!Task.isAccepting(taskId)){
            return {
                status: false,
                errorMessage: "Submission date passed."
            }
        }
        const result = await Submission.findByIdAndUpdate(submissionId,{
            imageUrl: imageUrl
        },{new:true});
        return {
            status: true,
            submission: result
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.getSubmissionById = async (id) => {
    try {
        const submission = await Submission.findById(id);
        if(submission){
            return {
                status: true,
                submission: submission
            }
        }else{
            return {
                status: false,
                errorMessage: "Unknown error"
            }
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

exports.findSubmission = async (query) => {
    try {
        const submissionArray = await Submission.find(query).populate("studentId","studentName email").populate("taskId","taskName endDate");
        if(submissionArray.length===0){
            return {
                status: false,
            }
        }else{
            return {
                status: true,
                submissionArray: submissionArray
            }
        } 
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}

const submissionImageUrl = async (imageData) => {
    return await GetImageUrl.getImageUrl(imageData);
}

exports.putMarks = async (submissionId,marks) => {
    try {
        if(marks>10 || marks<0){
            return {
                status: false,
                errorMessage: "Marks should be less than or equal to 10 and greater than or equal to 0."
            }
        }
        const result = await Submission.findByIdAndUpdate(submissionId,{
            marks: marks
        })
        return {
            status: true
        }
    } catch (err) {
        return {
            status: false,
            errorMessage: err.message
        }
    }
}