const sql = require('pg')
var config = {
    user: 'postgres',
    password: 'Du6Zs5n6',
    server: 'localhost',
    database: 'mydatabase'
};

const poolPromise = new sql.ConnectionPool(config).connect().then(pool => {
    console.log('Connected to database');
    return pool
}).catch(err => console.log("Database error", err))

module.exports = {sql, poolPromise}