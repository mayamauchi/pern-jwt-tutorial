//helps configure connection
const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "kthl8822",
  port: 5432,
  database: "jwttutorial"
});

module.exports = pool;
