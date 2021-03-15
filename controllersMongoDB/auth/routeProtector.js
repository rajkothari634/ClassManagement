const { promisify } = require("util");
const envJson = require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.routeProtector = async (req,res,next) => {
  let errorCode = 500;
  try {
    var token;
    //Authorization  header  checking
    if(req.url==="/login" || req.url==="/student/createStudent" || req.url==="/instructor/createInstructor"){
      next();
      return;
    }
    if (req.headers.authorization && req.headers.authorization.length > 0) {
      token = req.headers.authorization;
    } else {
      error_code = 401;
      throw Error("Login is required");
    }
    const user = await promisify(jwt.verify)(
      token,
      `${envJson.parsed.JWT_SECRET}`
    );
    if(user.id===undefined || user.role===undefined | user.email===undefined){
      errorCode = 400;
      throw Error("jwToken is wrong")
    }
    // url that required just logged user
    if(req.url=== "/instructor/getAllInstructor" || req.url==="/student/getAllStudent" || req.url==="/task/getAllTask"){
      next();
      return;
    }
    //
    let verificationDetails = await verification(req,user);
    if(!verificationDetails.status){
      errorCode = 403
      throw Error("Not Correct User")
    }
    req = verificationDetails.req;
    next();
  } catch (err) {
    res.status(errorCode).json({
      errorText: err.message,
      status: false
    })
  }
}
const verification = (req,user) => {
  let url = req.url;
  url = url.split("?")[0];
  switch(url){
    case "/instructor/getAllStudent":
      return verifyInstructor(req,user,"GET")
    case "/instructor/getAllSubmission":
      return verifyInstructor(req,user,"GET")
    case "/instructor/getAllTask":
      return verifyInstructor(req,user,"GET")
    case "/instructor/getInstructor":
      return verifyInstructor(req,user,"GET")
    case "/student/getAllInstructor":
      return verifyStudent(req,user,"GET")
    case "/student/getAllSubmission":
      return verifyStudent(req,user,"GET")
    case "/student/getAllTask":
      return verifyStudent(req,user,"GET")
    case "/student/getStudent":
      return verifyStudent(req,user,"GET")
    case "/student/selectInstructor":
      return verifyStudent(req,user,"POST")
    case "/task/createTask":
      return verifyInstructor(req,user,"POST")
    case "/task/getAllSubmission":
      return verifyInstructor(req,user,"GET")
    case "/task/getTask":
      return verifyInstructor(req,user,"GET")
    case "/task/updateTask":
      return verifyInstructor(req,user,"POST")
    case "/submission/createSubmission":
      return verifyStudent(req,user,"POST")
    case "/submission/getSubmission":
      return verifyStudent(req,user,"GET")
    case "/submission/putMarks":
      return verifyInstructor(req,user,"POST")
    case "/submission/updateSubmission":
      return verifyStudent(req,user,"POST")
  }
}

const verifyInstructor = (req,user,method) => {
  if(user.role!=="instructor"){
    return {
      status: false,
      req: req
    }
  }
  if(method==="GET"){
    req.query["id"] = user.id;
  }
  if(method==="POST"){
    req.body.instructorId = user.id
  }
  return {
    status: true,
    req: req
  }
}
const verifyStudent = (req,user,method) => {
  if(user.role!=="student"){
    return {
      status: false,
      req: req
    }
  }
  if(method==="GET"){
    req.query["id"]=user.id;
  }
  if(method==="POST"){
    req.body.studentId = user.id;
    req.body.id = user.id;
  }
  return {
    status: true,
    req: req
  }
}
