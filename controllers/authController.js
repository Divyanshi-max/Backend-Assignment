const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../database");

const router = express.Router();

// Register a new user
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password,
    isActive: true,
    roles: ["user"]
  };
  users.push(user);
  res.json(user);
});

// Login user and return JWT token
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) { return res.status(401).send("Invalid credentials"); }

  const accessToken = jwt.sign({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isActive: user.isActive,
    roles: user.roles
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

  res.json({ accessToken });
});

module.exports = router;
