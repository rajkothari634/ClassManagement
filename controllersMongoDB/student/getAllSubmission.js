const Student = require("../../databaseMongo/student");
const Task = require("../../databaseMongo/task");

exports.getAllSubmission = async (req,res) => {
    let errorCode = 500
    try {
        const studentId = req.query["id"];
        const student = await Student.findStudentById(studentId);
        const submissionArray = student.submissionIds;
        for(let j=0;j<submissionArray.length; j++){
            const taskDetail = await Task.getTaskById(submissionArray[i].taskId);
            if(taskDetail.status){
                submissionArray[i].taskId = taskDetail.task;
            }
        }
        res.status(200).json({
            status: true,
            data: {
                submissionArray: submissionArray
            }
        })
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        })
    }
}