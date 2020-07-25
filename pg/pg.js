const { Pool } = require("pg");

const connectingString =
  "postgressql://postgres:postgrespass@localhost:5432/postgres";

const pool = new Pool();

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query;
      //patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.log("5 seconds passed");
      }, 5000);
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err);
        // clear our timeout
        clearTimeout(timeout);
        // set the query method back to its old un-monkey-patched version
        client.query = query;
      };
      callback(err, client, release);
    });
  },
};
