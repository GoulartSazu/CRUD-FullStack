import mysql from "mysql"

export const db = mysql.createConnection({
    // host: 'localhost',
    // user: 'splash-admin',
    // password: 'sazu',
    // database: 'splash',
    // charset: 'utf8mb4',
    // port: 3306
    host: "127.0.0.1",
    user: "splash-admin",
    password: "sazu",
    database: "splash"
})