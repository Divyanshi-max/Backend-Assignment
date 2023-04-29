const express = require("express");
const todoController = require("./controllers/todoController");
const authController = require("./controllers/authController");

const router = express.Router();

// Register and login routes
router.use("/auth", authController);

// Todo routes
router.use("/todos", authenticateToken, todoController);

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  // Verify the token and extract the user information
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
