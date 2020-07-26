const router = require("express").Router();
const CreateStudent = require("./createstudent");
const CreateTask = require("./createtask");
const FetchTask = require("./fetchtask");
const StuTaskPerformance = require("./stutaskperformance");
const SubmitTask = require("./submittask");
const PutGrade = require("./putgrade");
const GetGrade = require("./getgrades");
const Login = require("./login");
const ProtectRoute = require("./protectroute");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

router.post("/createstudent", CreateStudent.createStudent);
router.post(
  "/createinstructor",
  require("./createinstructor").createInstructor
);
router.get("/getAllTask", ProtectRoute.protect, FetchTask.fetchAllTask);
router.post(
  "/createtask",
  ProtectRoute.protect,
  upload.single("image"),
  CreateTask.createTask
);
router.post(
  "/submitTask",
  ProtectRoute.protect,
  upload.single("image"),
  SubmitTask.submitTask
);
router.post(
  "/stuTaskPerformance",
  ProtectRoute.protect,
  StuTaskPerformance.StudentTaskPerformance
);
router.post("/putGrade", ProtectRoute.protect, PutGrade.putGrade);
router.get("/getGrade", ProtectRoute.protect, GetGrade.getGrades);
router.post("/login", Login.login);

module.exports = router;
