import 'dotenv/config'
import * as mysql from "mysql2"

//const user = "root";
//const password = "root";
//const database = "esco";
//const host = "localhost";

export const connectionPool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  multipleStatements: true,
});
