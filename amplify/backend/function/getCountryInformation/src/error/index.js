module.exports = function handleError(err, req, res, next) {
  console.error("handleError::general error", err);
  if (res) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
