const Student = require("../../databaseMongo/student");

//400 => invalid feilds
exports.createStudent = async (req,res) => {
    var errorCode = 500;
    try {
        if(!isValid(req.body)){
            errorCode = 400
            throw Error("requested body is not valid")
        }
        const studentDetail = await Student.createStudent(req.body);
        if(studentDetail.status){
            res.status(200).json({
                status: true,
                data: {
                    student: {
                        _id: studentDetail.student._id,
                        instructorName: studentDetail.student.name,
                        email: studentDetail.student.email
                    }
                }
            })
        }else{
            errorCode = 400;
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
const isValid = (body) => {
    return true
}