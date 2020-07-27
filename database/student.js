const pg = require("../pg/pg");

class Student {
  static async insert(student_id, name, password, level, instructor) {
    const query = `INSERT INTO STUDENT (
            student_seq_no,
            student_id,
            name,
            password,
            level,
            instructor_id
        )
        VALUES(
            nextval('STUDENT_SEQ_NO'),$1,$2,$3,$4,$5
        );`;
    try {
      console.log("database student started");
      const result = await pg.query(query, [
        student_id,
        name,
        password,
        level,
        instructor,
      ]);
      console.log(result.rows);
      if (result.rowCount === 1) {
        return {
          status: true,
          body: result.rows,
        };
      } else {
        throw Error(result);
      }
    } catch (err) {
      return {
        status: false,
        err_code: err,
      };
    }
  }

  static async submitTask(newTaskJson, student_id, instructor_id) {
    try {
      var stu_task_obj = [];
      var query = `SELECT STUDENT_TASK FROM STUDENT WHERE STUDENT_ID = $1 AND INSTRUCTOR_ID = $2;`;
      const result = await pg.query(query, [student_id, instructor_id]);
      if (!result.rows[0].student_task) stu_task_obj.push(newTaskJson);
      else {
        var tempObj = result.rows[0].student_task;
        for (let index = 0; index < tempObj.length; index++) {
          stu_task_obj.push(tempObj[index]);
        }
        stu_task_obj.push(newTaskJson);
      }

      query = `UPDATE STUDENT SET STUDENT_TASK = ($1) WHERE STUDENT_ID = ($2);`;

      const sub_task_result = await pg.query(query, [stu_task_obj, student_id]);

      if (sub_task_result.rowCount === 0) {
        throw Error("err in updating");
      }
      return {
        status: true,
        data: sub_task_result.rows,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
      };
    }
  }
  static async getTaskInfoByTaskAndStuId(taskId, studentId) {
    try {
      const query = `SELECT STUDENT_TASK FROM STUDENT WHERE STUDENT_ID = ($1);`;
      const result = await pg.query(query, [studentId]);
      if (result.rowCount == 1) {
        var temp = result.rows[0].student_task;
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].taskId === taskId) {
            return {
              status: true,
              data: temp[i],
            };
          }
        }
        throw Error("task not found");
      }
      throw Error("error in finding students");
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  static async putGrade(studentId, taskId, marks, id) {
    try {
      var stu_task_obj = [];
      console.log("sfs" + studentId);
      var query = `SELECT STUDENT_TASK FROM STUDENT WHERE STUDENT_ID = $1 AND INSTRUCTOR_ID = ($2);`;
      const result = await pg.query(query, [studentId, id]);
      if (!result.rows[0].student_task) throw Error("could not find task");
      else {
        var tempObj = result.rows[0].student_task;
        for (let index = 0; index < tempObj.length; index++) {
          if (tempObj[index].taskId == taskId) {
            tempObj[index].marks = marks;
          }
          stu_task_obj.push(tempObj[index]);
        }
      }
      query = `UPDATE STUDENT SET STUDENT_TASK = ($1) WHERE STUDENT_ID = ($2);`;

      const sub_task_result = await pg.query(query, [stu_task_obj, studentId]);

      if (sub_task_result.rowCount === 0) {
        throw Error("err in updating");
      }
      return {
        status: true,
        data: sub_task_result.rows,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        err_code: err,
      };
    }
  }

  static async getGrade(studentId) {
    try {
      var query = `SELECT STUDENT_TASK FROM STUDENT WHERE STUDENT_ID = $1;`;
      const result = await pg.query(query, [studentId]);
      if (!result.rows[0].student_task) throw Error("could not find task");
      return {
        status: true,
        data: result.rows[0].student_task,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  static async checkUser(student_id, password) {
    try {
      var query = `SELECT * FROM STUDENT WHERE STUDENT_ID = ($1) AND PASSWORD = ($2) ;`;
      const result = await pg.query(query, [student_id, password]);
      if (result.rowCount === 1) {
        return {
          status: true,
          data: result.rows[0],
        };
      } else {
        throw Error("not found");
      }
    } catch (err) {
      return {
        status: false,
      };
    }
  }
}

module.exports = Student;
