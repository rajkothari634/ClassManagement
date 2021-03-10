const Task = require("../../databaseMongo/task");
const Instructor = require("../../databaseMongo/instructor");
const Submission = require("../../databaseMongo/submission")

exports.getAllSubmission = async (req,res) => {
    let errorCode = 500;
    try {
        const query = req.query;
        const queryObject = extractQueryObject(query);
        const instructorDetail = await Instructor.findInstructorById({
            id: queryObject["id"],
            fetchTaskDetail: 0,
            fetchStudentDetail: 0
        });
        if(instructorDetail.status){
            let instructor = instructorDetail.instructor;
            let submissionDetail = await Submission.findSubmission({
                'taskId':{$in: instructor.taskIds}
            })
            if(submissionDetail.status){
                res.status(200).json({
                    status: true,
                    data: {
                        submissionArray: submissionDetail.submissionArray
                    }
                })
            }else{
                throw Error(submissionDetail.errorMessage)
            }
        }else{
            errorCode=400;
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

const extractQueryObject = (query) => {
    let queryObject = {};
    if(query["id"]!==undefined && query["id"] !== null){
        queryObject["id"] = query["id"];
    }
    return queryObject;
}