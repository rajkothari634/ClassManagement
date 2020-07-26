const router = require("express").Router();
const CreateStudent = require("./createstudent");
const CreateTask = require("./createtask");
const FetchTask = require("./fetchtask");
const StuTaskPerformance = require("./stutaskperformance");
const SubmitTask = require("./submittask");
const PutGrade = require("./putgrade");
const GetGrade = require("./getgrades");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

router.post("/createstudent", CreateStudent.createStudent);
router.post(
  "/createinstructor",
  require("./createinstructor").createInstructor
);
router.get("/getAllTask", FetchTask.fetchAllTask);
router.post("/createtask", upload.single("image"), CreateTask.createTask);
router.post("/submitTask", upload.single("image"), SubmitTask.submitTask);
router.post("/stuTaskPerformance", StuTaskPerformance.StudentTaskPerformance);
router.post("/putGrade", PutGrade.putGrade);
router.get("/getGrade", GetGrade.getGrades);

module.exports = router;
