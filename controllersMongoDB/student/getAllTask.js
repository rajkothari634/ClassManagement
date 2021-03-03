const Student = require("../../databaseMongo/student");
const Task = require("../../databaseMongo/task");
const ExtractTask = require("../../helper/extractTask");
exports.getAllTask = async (req,res) => {
    let errorCode = 500
    try {
        const studentId = req.query["studentId"];
        const studentDetail = await Student.findStudentById(studentId);
        if(!studentDetail.status){
            throw Error("student not found")
        }
        let taskHashMapDetail = await ExtractTask.extractTask(studentDetail.student);
        if(taskHashMapDetail.status){
            res.status(200).json({
                status: true,
                data: {
                    taskHashMap: taskHashMapDetail.taskHashMap
                }
            })
        }else{
            errorCode = 404;
            throw Error("task not found")
        }

    } catch (err) {
        console.log(err)
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        })
    }
}