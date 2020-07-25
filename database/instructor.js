const pg = require("../pg/pg");

class Instructor {
  static async insert(instructor_id, name, password, level) {
    const query = `INSERT INTO INSTRUCTOR (
            instructor_seq_no,
            instructor_id,
            name,
            password,
            level
        )
        VALUES(
            nextval('INSTRUCTOR_SEQ_NO'),$1,$2,$3,$4
        );`;
    try {
      console.log("database student started");
      const result = await pg.query(query, [
        instructor_id,
        name,
        password,
        level,
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

  static async findInstructorById(id) {
    const query = `SELECT * FROM INSTRUCTOR WHERE instructor_id = $1`;
    try {
      const result = await pg.query(query, [id]);
      if (result.rowCount === 1) {
        return {
          status: true,
        };
      }
      throw Error("not found");
    } catch (err) {
      return {
        status: false,
      };
    }
  }
}

module.exports = Instructor;
