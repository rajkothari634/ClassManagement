const Student = require("../../databaseMongo/student");
const ExtractTaskByStudent = require("../../helper/extractTaskByStudent");
exports.getStudent = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["id"]===undefined || req.query["id"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        let studentDetail = await Student.findStudentById(req.query["id"]);
        if(studentDetail.status){
            let taskHashMapDetail = await  ExtractTaskByStudent.extractTaskByStudent(studentDetail.student);
            if(taskHashMapDetail.status){
                studentDetail.student.taskHashMap = taskHashMapDetail.taskHashMap;
            }
            res.status(200).json({
                status: true,
                data: {
                    student: studentDetail.student
                }
            })
        }else{
            throw Error(studentDetail.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}