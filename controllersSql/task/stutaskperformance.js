const Student = require("../../databaseSql/student");
const Task = require("../../databaseSql/task");

exports.StudentTaskPerformance = async (req, res) => {
  try {
    console.log(req.body.taskId);

    var studentlistresult = await Task.getAllStudentByTaskId(
      req.body.taskId,
      req.body.studentId
    );
    if (studentlistresult.status == true) {
      var studentArray = studentlistresult.data;
      console.log(studentArray);
      var StudentTaskInfo = [];
      for (var i = 0; i < studentArray.length; i++) {
        var singleStuInfoResult = await Student.getTaskInfoByTaskAndStuId(
          req.body.taskId,
          studentArray[i]
        );
        if (singleStuInfoResult.status == true) {
          StudentTaskInfo.push({
            studentId: studentArray[i],
            taskInfo: singleStuInfoResult.data,
          });
        } else {
          throw Error("error in finding");
        }
      }
      res.status(200).json({
        req_result: "T",
        data: StudentTaskInfo,
      });
      return;
    }
    throw Error("not able to get list of students");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      req_result: "F",
      err_text: err.message,
    });
  }
};
