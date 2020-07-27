const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.protect = async (req, res, next) => {
  try {
    console.log("inside protect");
    let token;
    console.log(req.url);
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      throw Error("Login Require");
    }
    //verify token
    const decoded = await promisify(jwt.verify)(
      token,
      "secret-key-needed-for-jwt-token"
    );
    console.log(decoded);
    req.jwtId = decoded.id;
    req.otherId = decoded.other_id;
    next();
  } catch (err) {
    res.status(400).json({
      req_result: "F",
      err_info: {
        err_code: 400,
        err_txt: "Login Required",
      },
    });
  }
};
