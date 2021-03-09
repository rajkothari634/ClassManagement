const Instructor = require("../../databaseMongo/instructor");

//not found - 404
exports.getAllTask = async (req,res) => {
    let errorCode = 500;
    try {
        const instructorId = req.query["id"];
        const instructorDetail = await Instructor.findInstructorById({id:instructorId});
        if(instructorDetail.status){
            const taskArray = instructorDetail.instructor.taskIds;
            res.status(200).json({
                status: true,
                data: {
                    taskArray: taskArray
                }
            })
        }else{
            errorCode = 404;
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