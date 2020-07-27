const Instructor = require("../../database/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createInstructor = async (req, res) => {
  try {
    if (
      !req.body.instructor_id ||
      !req.body.name ||
      !req.body.password ||
      !req.body.level
    ) {
      throw Error("Fields are missing");
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 12);
      const insertResult = await Instructor.insert(
        req.body.instructor_id,
        req.body.name,
        req.body.password,
        req.body.level
      );
      if (insertResult.status === true) {
        const token = jwt.sign(
          {
            id: req.body.instructor_id,
            type: "instructor",
          },
          "secret-key-needed-for-jwt-token",
          {
            expiresIn: "90d",
          }
        );
        res.status(200).json({
          req_result: "T",
          token: token,
          body: {
            instructor_id: req.body.instructor_id,
            name: req.body.name,
            level: req.body.level,
          },
        });
      } else {
        throw Error(insertResult.err_code);
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
