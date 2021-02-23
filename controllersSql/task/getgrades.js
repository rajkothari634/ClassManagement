const Student = require("../../database/student");

exports.getGrades = async (req, res) => {
  try {
    req.query.studentId = req.jwtId;
    const result = await Student.getGrade(req.query.studentId);
    if (result.status == false) throw Error("Student Not Found");
    res.status(200).json({
      req_result: "T",
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
