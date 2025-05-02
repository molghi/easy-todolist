const express = require("express");
const router = express.Router(); // bring in express router

const { readAllTodos, addNewTodo, deleteOneTodo, editOneTodo } = require("../controllers/todosController"); // bring in route handlers

// ====================================================================================

// Read all from DB
// route - GET /todos
router.get("/", readAllTodos);

// ====================================================================================

// Add new todo to DB
// route - POST /todos
router.post("/", addNewTodo);

// ====================================================================================

// Delete one todo from DB
// route - DELETE /todos
router.delete("/", deleteOneTodo);

// ====================================================================================

router.patch("/:id", editOneTodo);

// ====================================================================================

module.exports = router; // export router to use it in 'server'
