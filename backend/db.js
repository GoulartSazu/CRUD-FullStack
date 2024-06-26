import mysql from "mysql";

// dev 
// host: "localhost",
// user: "root",

const dbConfig = {
  host: "127.0.0.1",
  user: "splash-admin",
  password: "sazu",
  database: "splash",
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database SPLASH:", err);
      setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
    } else {
      console.log("Connected to the database :]");
    }
  });

  db.on("error", function (err) {
    console.error("Database error F TOTAL", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "ETIMEDOUT"
    ) {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });

  // Ping the database every minute to keep the connection alive
  setInterval(() => {
    db.query("SELECT 1", (err, results) => {
      if (err) {
        console.error("Error pinging the database:", err);
      }
    });
  }, 120000); // Ping every minute
}

handleDisconnect();

export { db };
