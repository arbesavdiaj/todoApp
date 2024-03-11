const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "secretKey");
    if (!decoded.userId) {
      throw new Error("Account ID not found in token");
    }
    req.user = {
      userId: decoded.userId,
    };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}
module.exports = verifyToken;
