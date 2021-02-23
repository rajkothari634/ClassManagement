const router = require("express").Router();
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//create submission
//give marks to submission 
//read submission
//updateSubmission

const CreateSubmission = require("../../controllersMongoDB/submission/createSubmission");
const PutMarks = require("../../controllersMongoDB/submission/putMarks");
const GetSubmission = require("../../controllersMongoDB/submission/getSubmission");
const UpdateSubmission = require("../../controllersMongoDB/submission/updateSubmission");

router.post("/createSubmission", upload.single("image"), CreateSubmission.createSubmission);
router.post("/putMarks", PutMarks.putMarks);
router.get("/getSubmission", GetSubmission.getSubmission);
router.post("/updateSubmission", upload.single("image"), UpdateSubmission.updateSubmission );

module.exports = router;
