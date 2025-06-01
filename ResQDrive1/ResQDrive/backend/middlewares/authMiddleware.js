const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "mysecret"; // fallback secret

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const user = jwt.verify(token, secret);
    req.user = user; // { id, email, userType, iat, exp }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
