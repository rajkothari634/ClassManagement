const pg = require("../pg/pg");
class Task {
  static async insert(instructor_id, imgUrl, explanation, level) {
    const query = `INSERT INTO TASK (
            task_seq_no,
            instructor_id,
            imageurl,
            explanation,
            level
        )
        VALUES(
            nextval('TASK_SEQ_NO'),$1,$2,$3,$4
        );`;
    try {
      const result = await pg.query(query, [
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
}
