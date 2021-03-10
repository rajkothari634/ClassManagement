const Instructor = require("../../databaseMongo/instructor");

exports.getAllInstructor = async (req,res) => {
    let errorCode = 500;
    try {
        const query = req.body;
        const queryObject = extractQueryObject(query);
        const instructorArrayDetails = await Instructor.findInstructor(queryObject);
        if(instructorArrayDetails.status){
            res.status(200).json({
                status: true,
                data: {
                    instructorArray: instructorArrayDetails.instructorArray
                }
            })
        }else{
            throw Error(instructorArrayDetails.errorMessage)
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
    if(query["email"]!==undefined && query["email"] !== null){
        queryObject["email"] = query["email"]
    }
    if(query["instructorName"]!==undefined && query["instructorName"] !== null){
        queryObject["instructorName"] = query["instructorName"]
    }
    if(query["taskIds"]!==undefined && query["taskIds"] !== null){
        queryObject["taskIds"] =  { $all: query["taskIds"] } 
    }
    if(query["studentIds"]!==undefined && query["studentIds"] !== null){
        queryObject["studentIds"] = { $all: query["studentIds"] }
    }
    return queryObject
}