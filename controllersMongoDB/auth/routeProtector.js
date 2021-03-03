const { promisify } = require("util");
const envJson = require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.routeProtector = async (req,res,next) => {
    try {
        var token;
        next();
        return;
        //Authorization  header  checking
        if (req.headers.authorization && req.headers.authorization.length > 0) {
          token = req.headers.authorization;
        } else {
          error_code = 401;
          throw Error("Login is required");
        }
        
        const decoded = await promisify(jwt.verify)(
          token,
          `${envJson.parsed.JWT_SECRET}`
        );
        
    } catch (err) {
        res.status(400).json({
            status: false
        })
    }
}