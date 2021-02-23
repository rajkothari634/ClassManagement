const Instructor = require("../../databaseMongo/instructor");

exports.getInstructor = async (req,res) => {
    let errorCode = 500
    try {
        if(req.query["id"]===undefined || req.query["id"] === null){
            errorCode = 400;
            throw Error("fields are missing");
        }
        const instructorDetail = await Instructor.findInstructorById(req.query["id"]);
        if(instructorDetail.status){
            res.status(200).json({
                status: true,
                data: {
                    instructor: instructorDetail.instructor
                }
            })
        }else{
            throw Error(instructorDetail.errorMessage)
        }
    } catch (err) {
        res.status(errorCode).json({
            errorText: err.message,
            status: false,
            errorCode: errorCode
        });
    }
}