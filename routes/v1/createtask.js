const Task = require("../../database/task");
const req = require("postman-request");
const util = require("util");
const reqPost = util.promisify(req.post);
require("dotenv").config({ path: `${__dirname}/config.env` });

exports.createTask = async (req, res) => {
  try {
    req.body.instructorId = req.jwtId;
    const encoded = req.file.buffer.toString("base64");
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

    const insertResult = await Task.insert(
      req.body.instructorId,
      imgUpload.data.image.url,
      req.body.explanation,
      req.body.level
    );
    if (insertResult.status == true) {
      res.status(200).json({
        req_result: true,
        body: {
          task_id: req.body.instructorId,
          imgUrl: imgUpload.data.image.url,
          explanation: req.body.explanation,
          level: req.body.level,
        },
      });
      return;
    }
    throw Error("not able to put the task");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      error_info: {
        error_code: 400,
        error_text: err,
      },
    });
  }
};
