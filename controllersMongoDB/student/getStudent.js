const Student = require("../../databaseMongo/student");

exports.getStudent = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["id"]===undefined || req.query["id"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        const studentDetail = await Student.findStudentById(req.query["id"]);
        if(studentDetail.status){
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