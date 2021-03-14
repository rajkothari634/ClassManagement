const Task = require("../../databaseMongo/task");

exports.getTask = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["taskId"]===undefined || req.query["taskId"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }

        const taskDetail = await Task.getTaskById(req.query["taskId"]);
        if(taskDetail.status){
            if(taskDetail.task.instructorId._id.toString()!==req.query["id"]){
                errorCode = 402;
                throw Error("task is created by other instructor")
            }
            res.status(200).json({
                status: true,
                data: {
                    task: taskDetail.task
                }
            })
        }else{
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