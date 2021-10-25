class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

/* 404 Not Found error */

class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

/* 401 Unauthorized error */

class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 400);
  }
}

/* 403 Bad Request error */

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
};
