const Task = require("../../databaseMongo/task");
const Instructor = require("../../databaseMongo/instructor");

exports.createTask = async (req,res) => {
    let errorCode = 500;
    try {
        let body = req.body;
        let instructorId = req.body.instructorId;
        if(!isValid(body,req.file)){
            errorCode = 400
            throw Error("requested body is not valid")
        }
        let imageData = req.file.buffer.toString("base64");
        const taskDetail = await Task.createTask(body,imageData);
        if(taskDetail.status){
            const updatedInstructor = await Instructor.insertTaskId(instructorId,taskDetail.task._id);
            if(updatedInstructor.status){
                res.status(200).json({
                    status: true,
                    data: {
                        task: task
                    }
                })
            }else{
                res.status(201).json({
                    status: false,
                    data: {
                        task: task
                    },
                    errorText: "Task is created but instructor is not updated"
                })
            }

        }else{
            errorCode = 400;
            throw Error(taskDetail.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}
const isValid = (body,file) => {
    if(file === undefined || file === null || file.buffer === undefined || file.buffer === null){
        return false
    }
    return true
}