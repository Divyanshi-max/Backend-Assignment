const express = require("express");
const jwt = require("jsonwebtoken");
const { todos } = require("../database");

const router = express.Router();

// Get all todos
router.get("/getall", authenticateToken, (req, res) => {
  res.json(todos);
});

// Get a single todo
router.get("/get/:id", authenticateToken, (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

// Create a new todo
router.post("/create", authenticateToken, (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(todo);
  res.json(todo);
});

// Update a todo
router.put("/put/:id", authenticateToken, (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  todo.title = req.body.title;
  res.json(todo);
});

// Delete a todo
router.delete("/delete/:id", authenticateToken, (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send("Todo not found");
  todos.splice(todoIndex, 1);
  res.send("Todo deleted successfully");
});

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