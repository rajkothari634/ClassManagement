const Task = require("../../databaseMongo/task");

exports.getTask = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["id"]===undefined || req.query["id"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        const taskDetail = await Task.getTaskById(req.query["id"]);
        if(taskDetail.status){
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