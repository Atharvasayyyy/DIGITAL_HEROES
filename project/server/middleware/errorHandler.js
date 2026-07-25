/* eslint-disable no-unused-vars */
export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const response = { message: err.message || "Internal server error" };

  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  if (err.name === "ValidationError") {
    response.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(". ");
    response.status = 400;
  }

  if (err.name === "CastError") {
    response.message = "Invalid identifier provided";
    response.status = 400;
  }

  res.status(response.status || status).json({ message: response.message, stack: response.stack });
}
