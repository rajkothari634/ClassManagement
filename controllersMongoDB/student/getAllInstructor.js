const Student = require("../../databaseMongo/student");

exports.getAllInstructor = async (req,res) => {
    let errorCode = 500;
    try {
        const studentId = req.query["id"];
        const studentDetail = await Student.findStudentById(studentId);
        if(studentDetail.status){
            const instructorArray = studentDetail.student.instructorIds;
            res.status(200).json({
                status: true,
                data: {
                    instructorArray: instructorArray
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