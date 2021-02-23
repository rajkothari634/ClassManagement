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

router.post("/createInstructor", CreateInstructor.createInstructor);
router.get("/getAllInstructor", GetAllInstructor.getAllInstructor)
router.get("/getAllTask",GetAllTask.getAllTask);
router.get("/getAllStudent", GetAllStudent.getAllStudent);
router.get("/getInstructor",GetInstructor.getInstructor);

module.exports = router;
