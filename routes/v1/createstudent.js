const Student = require("../../database/student");
const Instructor = require("../../database/instructor");

exports.createStudent = async (req, res) => {
  try {
    console.log("fkrnjn");
    console.log(req.url);
    if (
      !req.body.student_id ||
      !req.body.name ||
      !req.body.password ||
      !req.body.level ||
      !req.body.instructor_id
    ) {
      console.log("filed missing");
      throw Error("Fields are missing");
    }
    console.log("all");
    const isInstructor = await Instructor.findInstructorById(
      req.body.instructor_id
    );
    if (isInstructor.status == false) {
      throw Error("instructor not found");
    }
    const insertResult = await Student.insert(
      req.body.student_id,
      req.body.name,
      req.body.password,
      req.body.level,
      req.body.instructor_id
    );
    if (insertResult.status === true) {
      res.status(200).json({
        req_result: "T",
        body: insertResult.body,
      });
    } else {
      throw Error(insertResult.err_code);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      error_info: {
        error_code: 400,
        error_text: err,
      },
    });
  }
};
