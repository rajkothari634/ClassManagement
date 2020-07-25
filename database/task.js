const pg = require("../pg/pg");
class Task {
  static async insert(instructor_id, imgUrl, explanation, level) {
    console.log("inside task");
    console.log(explanation + " " + instructor_id + " " + imgUrl + " " + level);
    const query = `INSERT INTO TASK (
            task_seq_no,
            task_id,
            instructor_id,
            imageurl,
            explanation,
            level
        )
        VALUES(
            nextval('TASK_SEQ_NO'),$1,$2,$3,$4,$5
        );`;
    try {
      const result = await pg.query(query, [
        instructor_id + " " + new Date(),
        instructor_id,
        imgUrl,
        explanation,
        level,
      ]);
      if (result.rowCount == 1) {
        return {
          status: true,
          body: result,
        };
      }
      throw Error("not successful");
    } catch (err) {
      console.log(err);
      return {
        status: false,
      };
    }
  }

  static async getAllTaskByInstructorId(instructorId, level) {
    const query = `SELECT TASK_ID , IMAGEURL , EXPLANATION , LEVEL FROM TASK WHERE INSTRUCTOR_ID = $1 AND LEVEL = $2 ;`;
    try {
      const result = await pg.query(query, [instructorId, level]);
      if (result.rowCount >= 0) {
        return {
          status: true,
          data: result,
        };
      }
      throw Error("not able to find task");
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  static async updateTaskStudentList(studentId, taskId) {
    try {
      var task_stu_obj = [];
      var query = `SELECT SUB_STUDENT FROM TASK WHERE TASK_ID = ($1);`;
      const result = await pg.query(query, [taskId]);
      if (!result.rows[0].sub_student)
        task_stu_obj.push({
          student_id: studentId,
        });
      else {
        console.log("ecggv");
        var tempObj = result.rows[0].sub_student;
        for (let index = 0; index < tempObj.length; index++) {
          task_stu_obj.push(tempObj[index]);
        }
        task_stu_obj.push({
          student_id: studentId,
        });
      }
      query = `UPDATE TASK SET SUB_STUDENT = ($1) WHERE TASK_ID = ($2);`;
      const task_stu_result = await pg.query(query, [task_stu_obj, taskId]);
      if (task_stu_result.rowCount === 0) {
        throw Error("err in updating");
      }
      return {
        status: true,
        data: task_stu_result.rows,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }
}

module.exports = Task;
