const Student = require("../../database/student");
const Task = require("../../database/task");
const req = require("postman-request");
const util = require("util");
const reqPost = util.promisify(req.post);
require("dotenv").config({ path: `${__dirname}/config.env` });

exports.submitTask = async (req, res) => {
  try {
    if (!req.body.taskId || !req.jwtId) throw Error("missing fields");
    const encoded = req.file.buffer.toString("base64");
    req.body.studentId = req.jwtId;
    let options = {
      key: "38fa6122d68d5de7b0076375dcd96148",
      image: encoded,
    };
    let imgUpload = await reqPost({
      url: "https://api.imgbb.com/1/upload",
      form: options,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    imgUpload = JSON.parse(imgUpload.body);
    if (imgUpload.status !== 200) {
      throw Error("not able to upload image");
    }
    console.log(imgUpload.data.image.url);
    var taskObj = {
      taskId: req.body.taskId,
      marks: "NAN",
      subImgUrl: imgUpload.data.image.url,
    };

    const result = await Student.submitTask(
      taskObj,
      req.body.studentId,
      req.other_id
    );
    if (result.status == true) {
      const taskUpdateResult = await Task.updateTaskStudentList(
        req.body.studentId,
        req.body.taskId
      );
      if (taskUpdateResult.status == true) {
        res.status(200).json({
          req_result: "T",
          data: {
            task_id: req.body.taskId,
            imgUrl: imgUpload.data.image.url,
          },
        });
        return;
      }
      throw Error("not updated to instructor task stu list");
    }
    throw Error("not updated");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
