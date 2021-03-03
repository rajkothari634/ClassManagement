const Instructor = require("../../databaseMongo/instructor");
const CreateJWT = require("../../helper/jwToken/createJWToken");
//400 => invalid feilds
exports.createInstructor = async (req,res) => {
    var errorCode = 500;
    try {
        console.log("creating instructor")
        console.log(req.body);
        if(!isValid(req.body)){
            errorCode = 400
            throw Error("requested body is not valid")
        }
        console.log("valid object")
        const instructorDetail = await Instructor.createInstructor(req.body);
        if(instructorDetail.status){
            const tokeDetail = await CreateJWT.createJWToken({
                userId: instructorDetail.instructor._id,
                email: instructorDetail.instructor.email,
                role: "instructor"
            })
            let instructor = {
                id: instructorDetail.instructor._id,
                instructorName: instructorDetail.instructor.instructorName,
                email: instructorDetail.instructor.email,
                jwToken: tokeDetail.jwToken
            }
            console.log("bhi");
            console.log(instructor)
            res.status(200).json({
                status: true,
                data: {
                    instructor: instructor
                }
            })
            console.log("completed by creation ")
        }else{
            errorCode = 400;
            throw Error(instructorDetail.errorMessage)
        }
    } catch (err) {
        console.log(err)
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