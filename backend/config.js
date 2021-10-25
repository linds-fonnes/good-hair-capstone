require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const API_KEY = process.env.API_KEY;

module.exports = {
  SECRET_KEY,
  API_KEY,
};
