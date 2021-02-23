const Instructor = require("../../databaseMongo/instructor");

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
        const instructorDetail = await Instructor.createInstructor(req.body);
        if(instructorDetail.status){
            res.status(200).json({
                status: true,
                data: {
                    instructor: {
                        _id: instructorDetail.instructor._id,
                        instructorName: instructorDetail.instructor.name,
                        email: instructorDetail.instructor.email
                    }
                }
            })
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