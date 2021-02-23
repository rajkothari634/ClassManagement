const Student = require("../../database/student");
const Instructor = require("../../database/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const envJson = require("dotenv").config();

exports.login = async (req, res) => {
  try {
    var result;
    req.body.password = await bcrypt.hash(req.body.password, 12);
    if (req.body.type == "instructor") {
      result = await Instructor.checkUser(req.body.id, req.body.password);
    } else {
      result = await Student.checkUser(req.body.id, req.body.password);
    }
    if (result.status == true) {
      var object;
      if (req.body.type == "instructor") {
        object = {
          id: req.body.id,
          type: "instructor",
        };
      } else {
        object = {
          id: req.body.id,
          other_id: result.body.instructor_id,
          type: "student",
        };
      }
      const token = jwt.sign(object, `${envJson.parsed.JWT_SECRET}`, {
        expiresIn: `${envJson.parsed.JWT_EXPIRES_IN}`,
      });
      res.status(200).json({
        result: true,
        token: token,
      });
    } else {
      throw Error("User Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
