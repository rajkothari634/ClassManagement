
exports.getAllTask = async (req,res) => {
    
}

const Task = require("../../databaseMongo/task");

exports.getAllTask = async (req,res) => {
    let errorCode = 500;
    try {
        const query = req.query;
        const queryObject = extractQueryObject(query);
        const taskArrayDetails = await Task.findTask(queryObject);
        if(taskArrayDetails.status){
            res.status(200).json({
                status: true,
                data: {
                    taskArray: taskArrayDetails.taskArray
                }
            })
        }else{
            throw Error(taskArrayDetails.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}
const extractQueryObject = (query) => {
    let queryObject = {};

    if(query["taskIds"]!==undefined && query["taskIds"] !== null){
        queryObject["taskId"] =  { $all: query["taskIds"] } 
    }
    if(query["studentIds"]!==undefined && query["studentIds"] !== null){
        queryObject["studentIds"] = { $all: query["studentIds"] }
    }
    return queryObject
}