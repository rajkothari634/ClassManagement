const Student = require("../../database/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Instructor = require("../../database/instructor");

exports.createStudent = async (req, res) => {
  try {
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
    const isInstructor = await Instructor.findInstructorById(
      req.body.instructor_id
    );
    if (isInstructor.status == false) {
      throw Error("instructor not found");
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
    console.log("hash password" + " " + req.body.password);

    const insertResult = await Student.insert(
      req.body.student_id,
      req.body.name,
      req.body.password,
      req.body.level,
      req.body.instructor_id
    );
    if (insertResult.status === true) {
      //
      const token = jwt.sign(
        {
          id: req.body.student_id,
          other_id: req.body.instructor_id,
        },
        "secret-key-needed-for-jwt-token",
        {
          expiresIn: "90d",
        }
      );
      ///
      res.status(200).json({
        req_result: "T",
        body: {
          student_id: req.body.student_id,
          name: req.body.name,
          instructor_id: req.body.instructor_id,
          level: req.body.level,
        },
        token: token,
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
