const router = require("express").Router();
const CreateStudent = require("../../controllersSql/student/createstudent");
const CreateTask = require("../../controllersSql/task/createtask");
const FetchTask = require("../../controllersSql/task/fetchtask");
const StuTaskPerformance = require("../../controllersSql/task/stutaskperformance");
const SubmitTask = require("../../controllersSql/task/submittask");
const PutGrade = require("../../controllersSql/task/putgrade");
const GetGrade = require("../../controllersSql/task/getgrades");
const Login = require("./login");
const ProtectRoute = require("./protectroute");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

router.post("/createstudent", CreateStudent.createStudent);
router.post(
  "/createinstructor",
  require("../../controllersSql/instructor/createinstructor").createInstructor
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
