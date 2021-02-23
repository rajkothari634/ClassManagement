const router = require("express").Router();

//create student
//get all task applied by student with completed not completed status
//select instructor
//getAllInstructor

const CreateStudent = require("../../controllersMongoDB/student/createStudent");
const GetAllTask = require("../../controllersMongoDB/student/getAllTask");
const SelectInstructor = require("../../controllersMongoDB/student/selectInstructor");
const GetAllStudent = require("../../controllersMongoDB/student/getAllStudent");
const GetAllInstructor = require("../../controllersMongoDB/student/getAllInstructor");
const GetStudent = require("../../controllersMongoDB/student/getStudent");
const GetAllSubmission = require("../../controllersMongoDB/student/getAllSubmission");
router.post("/createStudent", CreateStudent.createStudent);
router.post("/selectInstructor", SelectInstructor.selectInstructor);
router.get("/getAllTask", GetAllTask.getAllTask);
router.get("/getAllStudent", GetAllStudent.getAllStudent);
router.get("/getStudent",GetStudent.getStudent);
router.get("/getAllSubmission",GetAllSubmission.getAllSubmission);
router.get("/getAllInstructor", GetAllInstructor.getAllInstructor);
module.exports = router;
