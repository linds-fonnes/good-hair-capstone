const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressErrors");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;

    if (
      authHeader &&
      authHeader.replace(/^[Bb]earer /, "").trim() !== "undefined"
    ) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (e) {
    return next(e);
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (e) {
    return next(e);
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    if (!(user && user.email === req.params.email)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  authenticateJWT,
  ensureCorrectUser,
  ensureLoggedIn,
};
