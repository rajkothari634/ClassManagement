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
          },
          "secret-key-needed-for-jwt-token",
          {
            expiresIn: "90d",
          }
        );
        res.status(200).json({
          req_result: "T",
          token: token,
          body: insertResult.body,
        });
      } else {
        throw Error(insertResult.err_code);
      }
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
