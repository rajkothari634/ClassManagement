const { promisify } = require("util");
const envJson = require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.varifyJWToken = async (jwToken) => {
    try {
        const userDetail = await promisify(jwt.verify)(
            jwToken,
            `${envJson.parsed.JWT_SECRET}`
        );
        return {
            status: true,
            userDetail: userDetail
        }
    } catch (err) {
        return {
            status: false
        }
    }
}