const Task = require("../../database/task");

exports.fetchAllTask = async (req, res) => {
  try {
    if ((!req.query.instructorId && !req.jwtId) || !req.query.level) {
      throw Error("missing Fields");
    }
    if (req.routeType == "instructor") req.query.instructorId = req.jwtId;

    if (req.routeType == "student") req.query.instructorId = req.other_id;

    const result = await Task.getAllTaskByInstructorId(
      req.query.instructorId,
      req.query.level
    );
    console.log(result);
    if (result.status === false) throw Error(result.err_code);
    res.status(200).json({
      req_result: "T",
      data: result.data.rows,
    });
  } catch (err) {
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
