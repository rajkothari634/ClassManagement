const Task = require("../../database/task");

exports.createTask = async (req, res) => {
  try {
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
