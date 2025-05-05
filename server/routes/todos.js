const express = require("express");
const todosRouter = express.Router(); // bring in express router

const { readAllTodos, addNewTodo, deleteOneTodo, editOneTodo } = require("../controllers/todosController"); // bring in route handlers

// ====================================================================================

// Read all from DB
// route - GET /todos
todosRouter.get("/", readAllTodos);

// ====================================================================================

// Add new todo to DB
// route - POST /todos
todosRouter.post("/", addNewTodo);

// ====================================================================================

// Delete one todo from DB
// route - DELETE /todos
todosRouter.delete("/", deleteOneTodo);

// ====================================================================================

todosRouter.patch("/:id", editOneTodo);

// ====================================================================================

module.exports = todosRouter; // export router to use it in 'server'
