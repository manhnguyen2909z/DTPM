const sql = require('mssql/msnodesqlv8')

const config = {
    server: "localhost",
    database: "QL_VE_MAY_BAY",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        useUTC: true
      }
}

const conn = new sql.ConnectionPool(config).connect().then(pool => {return pool})

module.exports = {
    conn : conn,
    sql: sql
}