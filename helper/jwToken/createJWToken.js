const jwt = require("jsonwebtoken");
const envJson = require("dotenv").config();

exports.createJWToken = async (data) => {
  try {
    const token = await jwt.sign(
      {
        email: data.email,
        id: data._id,
        role: data.role,
      },
      `${envJson.parsed.JWT_SECRET}`,
      {
        expiresIn: `${envJson.parsed.JWT_EXPIRES_IN}`,
      }
    );
    return {
      status: true,
      jwToken: token
    }
  } catch (err) {
    return {
      status: false
    }
  }

}