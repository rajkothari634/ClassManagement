const Student = require("../../database/student");
const Instructor = require("../../database/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        };
      } else {
        object = {
          id: req.body.id,
          other_id: result.body.instructor_id,
        };
      }
      const token = jwt.sign(object, "secret-key-needed-for-jwt-token", {
        expiresIn: "90d",
      });
      res.status(200).json({
        result: true,
        token: token,
      });
    } else {
      throw Error("user not found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: false,
      err_info: {
        err_code: 400,
        err_txt: err,
      },
    });
  }
};
