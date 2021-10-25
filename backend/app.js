"use strict";

const { NotFoundError } = require("./expressErrors");
const stylistsRoutes = require("./routes/stylists");
const clientsRoutes = require("./routes/clients");
const { authenticateJWT } = require("./middleware/auth");

const express = require("express");
const app = express();
app.use(express.json());
app.use(authenticateJWT);
app.use("/stylists", stylistsRoutes);
app.use("/clients", clientsRoutes);

/* Handles 404 errors */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/* Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
