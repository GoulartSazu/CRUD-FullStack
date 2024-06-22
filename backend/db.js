import mysql from "mysql"

export const db = mysql.createConnection({
    host: "195.200.4.201",
    user: "splash-admin",
    password: "sazu",
    database: "splash"
})