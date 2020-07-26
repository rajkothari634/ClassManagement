const Student = require("../../database/student");

exports.putGrade = async (req, res) => {
  try {
    console.log(req.body.studentId);
    const result = await Student.putGrade(
      req.body.studentId,
      req.body.taskId,
      req.body.marks,
      req.jwtId
    );
    if (result.status != true) throw Error("err updating marks");
    res.status(200).json({
      req_result: "T",
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      err_info: {
        err_code: 400,
        err_txt: err,
      },
    });
  }
};
