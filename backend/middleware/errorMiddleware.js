const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("\n========== API ERROR ==========");
  console.error("METHOD:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("STATUS:", statusCode);
  console.error("MESSAGE:", err.message);
  console.error("STACK:", err.stack);
  console.error("================================\n");

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
