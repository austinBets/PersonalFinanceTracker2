const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "fintracker",
    //password: "test",
    port: 5432,
});

module.exports = pool;