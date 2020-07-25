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
      console.log(result + "fff");
      if (result.rowCount === 1) {
        return {
          status: true,
          body: result,
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
  static async submitTask(newTaskJson, student_id) {
    try {
      console.log("gfg");
      var stu_task_obj = [];
      var query = `SELECT STUDENT_TASK FROM STUDENT WHERE STUDENT_ID = $1;`;
      const result = await pg.query(query, [student_id]);
      console.log("gfg");
      console.log(result.rows[0]);
      console.log(result.rows[0].student_task);
      if (!result.rows[0].student_task) stu_task_obj.push(newTaskJson);
      else {
        console.log("ecggv");
        var tempObj = result.rows[0].student_task;
        for (let index = 0; index < tempObj.length; index++) {
          stu_task_obj.push(tempObj[index]);
        }
        stu_task_obj.push(newTaskJson);
      }
      console.log("awwa");
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
}

module.exports = Student;
