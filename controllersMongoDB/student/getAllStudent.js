const Student = require("../../databaseMongo/student");

exports.getAllStudent = async (req,res) => {
    let errorCode = 500;
    try {
        const query = req.body;
        const queryObject = extractQueryObject(query);
        console.log(queryObject)
        const studentArrayDetails = await Student.findStudent(queryObject);
        if(studentArrayDetails.status){
            res.status(200).json({
                status: true,
                data: {
                    studentArray: studentArrayDetails.studentArray
                }
            })
        }else{
            throw Error(studentArrayDetails.errorMessage)
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