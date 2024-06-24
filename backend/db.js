import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "splash-admin",
    password: "sazu",
    database: "splash"
})