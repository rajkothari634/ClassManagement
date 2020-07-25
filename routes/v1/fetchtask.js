const Task = require("../../database/task");

exports.fetchAllTask = async (req, res) => {
  try {
    if (!req.query.instructorId || !req.query.level) {
      throw Error("missing Fields");
    }
    const result = await Task.getAllTaskByInstructorId(
      req.query.instructorId,
      req.query.level
    );
    console.log(result);
    if (result.status === false) throw Error("not able to find task");
    res.status(200).json({
      req_result: "T",
      data: result.data.rows,
    });
  } catch (err) {
    res.status(400).json({
      req_result: "F",
      error_info: {
        err_code: 400,
        err_text: err,
      },
    });
  }
};
