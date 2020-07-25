const Instructor = require("../../database/instructor");

exports.createInstructor = async (req, res) => {
  try {
    console.log("fkrnjn");
    console.log(req.url);
    if (
      !req.body.instructor_id ||
      !req.body.name ||
      !req.body.password ||
      !req.body.level
    ) {
      console.log("filed missing");
      throw Error("Fields are missing");
    } else {
      console.log("all");
      const insertResult = await Instructor.insert(
        req.body.instructor_id,
        req.body.name,
        req.body.password,
        req.body.level
      );
      if (insertResult.status === true) {
        res.status(200).json({
          req_result: "T",
          body: insertResult.body,
        });
      } else {
        throw Error(insertResult.err_code);
      }
    }
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
