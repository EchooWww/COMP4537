const mysql = require("mysql2");
const fs = require("fs");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  ssl: {
    ca: process.env.MYSQL_SSL_CA,
    key: process.env.MYSQL_SSL_KEY,
    cert: process.env.MYSQL_SSL_CERT,
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Successfully connected to Cloud SQL!");
  db.end();
});
