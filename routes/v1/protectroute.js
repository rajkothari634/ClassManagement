const { JsonWebTokenError } = require("jsonwebtoken");
const envJson = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      throw Error("Login Require");
    }
    //verify token
    const decoded = await promisify(jwt.verify)(
      token,
      `${envJson.parsed.JWT_SECRET}`
    );
    req.jwtId = decoded.id;
    req.otherId = decoded.other_id;
    req.routeType = decoded.type;
    if (
      (decoded.type == "instructor" &&
        (req.url == "/createtask" ||
          req.url == "/getAllTask" ||
          req.url == "/stuTaskPerformance" ||
          req.url == "/putGrade")) ||
      (decoded.type == "student" &&
        (req.url == "/getAllTask" ||
          req.url == "/getGrade" ||
          req.url == "/submitTask"))
    ) {
      next();
    } else {
      throw Error("Login Please");
    }
  } catch (err) {
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
