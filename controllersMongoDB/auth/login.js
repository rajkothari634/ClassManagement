const Instructor = require("../../databaseMongo/instructor")
const Student = require("../../databaseMongo/student")
exports.login = async (req,res) => {
    let errorCode = 500;
    try {
        let body = req.body;
        if(!isValid(req.body)){
            errorCode = 400
            throw Error("Bad Request. Fields missing.")
        }
        let userDetail = {}
        if(body.role==="instructor"){
            userDetail = await Instructor.login(body.email,body.password);
        }else{
            userDetail = await Student.login(body.email,body.password);
        }
        if(userDetail.status){
            res.status(200).json({
                status: true,
                id: userDetail.user._id,
                role: userDetail.user.role,
                name: userDetail.user.name,
                email: userDetail.user.email,
                jwToken: userDetail.user.jwToken
            })
        }else{
            errorCode = 404
            throw Error(userDetail.errorMessage)
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
    const {role,password,email} = body;
    if(role===undefined || role===null || password===undefined || password===null || email===undefined || email===null){
        return false
    }
    if(role!=="instructor" || role!=="student"){

    }
    return true
}
