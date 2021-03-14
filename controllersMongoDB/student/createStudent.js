const Student = require("../../databaseMongo/student");
const CreateJWT = require("../../helper/jwToken/createJWToken");


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
            const tokeDetail = await CreateJWT.createJWToken({
                id: studentDetail.student._id,
                email: studentDetail.student.email,
                role: "student"
            })
            res.status(200).json({
                status: true,
                data: {
                    student: {
                        id: studentDetail.student._id,
                        studentName: studentDetail.student.studentName,
                        email: studentDetail.student.email,
                        jwToken: tokeDetail.jwToken
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