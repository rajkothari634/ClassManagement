const router = require("express").Router();
const CreateStudent = require("./createstudent");
const CreateTask = require("./createtask");
const FetchTask = require("./fetchtask");
const SubmitTask = require("./submittask");
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

module.exports = router;
