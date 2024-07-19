require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.cookies.token;

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided.Login First",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Invalid token format. Format should be 'Bearer <token>'.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session timed out. Please log in again.",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    console.error("JWT Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { verifyToken };
