/** Database setup */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///goodHair_test";
} else {
  DB_URI = "postgresql:///goodHair";
}

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;
