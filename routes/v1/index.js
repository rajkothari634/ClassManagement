const router = require("express").Router();
const CreateStudent = require("./createstudent");

router.post("/createstudent", CreateStudent.createStudent);
router.post(
  "/createinstructor",
  require("./createinstructor").createInstructor
);

module.exports = router;
