const Student = require("../../databaseMongo/student");
const Task = require("../../databaseMongo/task");

exports.getAllTask = async (req,res) => {
    let errorCode = 500
    try {
        const studentId = req.query["studentId"];
        const studentDetail = await Student.findStudentById(studentId);
        if(!studentDetail.status){
            throw Error("student not found")
        }
        const instructorArray = studentDetail.student.instructorIds;
        const submissionArray = studentDetail.student.submissionIds;
        let taskIdArray = []
        for(let i=0; i<instructorArray.length; i++){
            for(let j=0;j<instructorArray[i].taskIds.length;j++){
                taskIdArray.push(instructorArray[i].taskIds[j]);
            }
        }
        let taskArray = {}
        for(let i=0;i<taskIdArray.length;i++){
            let taskDetail = await Task.getTaskById(taskIdArray[i]);
            if(taskDetail.status){
                taskArray[taskDetail.task._id] = taskDetail.task;
                taskArray[taskDetail.task._id].completed = false;
            }
        }
        for(let j=0;j<submissionArray.length; j++){
            taskArray[submissionArray[i].taskId].completed = true;
        }
        res.status(200).json({
            status: true,
            data: {
                taskHashMap: taskArray
            }
        })
    } catch (err) {
        console.log(err)
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        })
    }
}