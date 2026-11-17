const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const statusCode = err.statusCode || err.status || 500;

  const isProduction = process.env.NODE_ENV === "production";

  const message =
    statusCode >= 500 && isProduction
      ? "Internal server error."
      : err.message || "Internal server error.";

  res.status(statusCode).json({
    success: false,
    message,
    ...(!isProduction && { stack: err.stack }),
  });
};

export default errorHandler;
