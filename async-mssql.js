
const sql = require('mssql')
const sqlConfig = {
  user: 'dev',
  password: '62v@]\\Rxdt6uPkGw',
  database: 'ecogiong-dev',
  server: '103.129.80.139',
  port:1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}


module.exports = sqlConfig
// async () => {
//  try {
//   // make sure that any items are correctly URL encoded in the connection string
//   await sql.connect(sqlConfig)
//   const result = await sql.query`select * from mytable where id = ${value}`
//   console.dir("connected")
//  } catch (err) {
//   // ... error checks
//   console.log(err)
//  }
// }