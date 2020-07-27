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
      const result = await pg.query(query, [
        instructor_id,
        name,
        password,
        level,
      ]);
      if (result.rowCount === 1) {
        return {
          status: true,
          body: result.rows,
        };
      } else {
        throw Error("Insertion Failed");
      }
    } catch (err) {
      return {
        status: false,
        err_code: err.message,
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

  static async checkUser(instructor_id, password) {
    try {
      var query = `SELECT * FROM INSTRUCTOR WHERE INSTRUCTOR_ID = ($1) AND PASSWORD = ($2) ;`;
      const result = await pg.query(query, [instructor_id, password]);
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

module.exports = Instructor;
