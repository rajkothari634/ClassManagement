const router = require("express").Router();

const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//create task
//edit task
//all submission
//allTask

const CreateTask = require("../../controllersMongoDB/task/createTask");
const UpdateTask = require("../../controllersMongoDB/task/updateTask");
const GetAllSubmission = require("../../controllersMongoDB/task/getAllSubmission");
const GetAllTask = require("../../controllersMongoDB/task/getAllTask");
const GetTask = require("../../controllersMongoDB/task/getTask")
router.post("/createTask", upload.single("image"), CreateTask.createTask);
router.post("/updateTask", upload.single("image"), UpdateTask.updateTask);
router.get("/getAllSubmission", GetAllSubmission.getAllSubmission);
router.post("/getAllTask", GetAllTask.getAllTask);
router.get("/getTask",GetTask.getTask)

module.exports = router;
