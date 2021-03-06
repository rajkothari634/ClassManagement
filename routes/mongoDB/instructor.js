//create instructor
//fetch all task provided by instructor
//fetch all student
//get all instructor

const router = require("express").Router()
const CreateInstructor = require("../../controllersMongoDB/instructor/createInstructor");
const GetAllInstructor = require("../../controllersMongoDB/instructor/getAllInstructor");
const GetAllTask = require("../../controllersMongoDB/instructor/getAllTask");
const GetAllStudent = require("../../controllersMongoDB/instructor/getAllStudent");
const GetInstructor = require("../../controllersMongoDB/instructor/getInstructor");
const GetAllSubmission = require("../../controllersMongoDB/instructor/getAllSubmission")

router.post("/createInstructor", CreateInstructor.createInstructor);
router.post("/getAllInstructor", GetAllInstructor.getAllInstructor);
router.get("/getAllTask",GetAllTask.getAllTask);
router.get("/getAllStudent", GetAllStudent.getAllStudent);
router.get("/getInstructor",GetInstructor.getInstructor);
router.get("/getAllSubmission",GetAllSubmission.getAllSubmission);

module.exports = router;
