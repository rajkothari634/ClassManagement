//create instructor
//fetch all task provided by instructor
//fetch all student
//get all instructor

const router = require("express").Router()
const Login = require("../../controllersMongoDB/auth/login");

router.post("/",Login.login);
module.exports = router;
