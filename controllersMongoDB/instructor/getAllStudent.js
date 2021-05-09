const Instructor = require("../../databaseMongo/instructor");

exports.getAllStudent = async (req,res) => {
    let errorCode = 500;
    try {
        const instructorId = req.query["id"];
        const instructorDetail = await Instructor.findInstructorById({id:instructorId});
        if(instructorDetail.status){
            const studentArray = instructorDetail.instructor.studentIds;
            res.status(200).json({
                status: true,
                data: {
                    studentArray: studentArray
                }
            })
        }else{
            errorCode = 403;
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