const mysql = require("mysql2");

const createConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "parking_lot"
  });
};

module.exports = createConnection;
