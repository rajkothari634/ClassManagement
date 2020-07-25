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
}

module.exports = Student;
