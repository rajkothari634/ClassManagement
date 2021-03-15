const Student = require("../../databaseMongo/student");
const Task = require("../../databaseMongo/task");
const ExtractTaskByStudent = require("../../helper/extractTaskByStudent");
exports.getAllTask = async (req,res) => {
    let errorCode = 500
    try {
        const studentId = req.query["id"];
        const studentDetail = await Student.findStudentById(studentId);
        if(!studentDetail.status){
            errorCode=404;
            throw Error("student not found")
        }
        let taskHashMapDetail = await ExtractTaskByStudent.extractTaskByStudent(studentDetail.student);
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
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        })
    }
}