const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function createToken(user) {
  console.log("createToken USER", user);
  let payload = {
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  console.log(token);
  return token;
}

module.exports = { createToken };
