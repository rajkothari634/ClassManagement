const Student = require("../../database/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Instructor = require("../../database/instructor");
const envJson = require("dotenv").config();

exports.createStudent = async (req, res) => {
  try {
    if (
      !req.body.student_id ||
      !req.body.name ||
      !req.body.password ||
      !req.body.level ||
      !req.body.instructor_id
    ) {
      throw Error("Fields are missing");
    }
    const isInstructor = await Instructor.findInstructorById({id: req.body.instructor_id
    });
    if (isInstructor.status == false) {
      throw Error("instructor not found");
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);

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
          type: "student",
        },
        `${envJson.parsed.JWT_SECRET}`,
        {
          expiresIn: `${envJson.parsed.JWT_EXPIRES_IN}`,
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
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
