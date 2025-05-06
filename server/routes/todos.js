const express = require("express");
const todosRouter = express.Router(); // bring in express router

const { readAllTodos, addNewTodo, deleteOneTodo, editOneTodo, checkLoggedIn } = require("../controllers/todosController"); // bring in route handlers

// ====================================================================================

// Check if logged in before proceeding to any of the actions beloww
todosRouter.use(checkLoggedIn);

// ====================================================================================

// Read all from DB
// route - GET /todos
todosRouter.get("/:userId", readAllTodos);

// ====================================================================================

// Add new todo to DB
// route - POST /todos
todosRouter.post("/", addNewTodo);

// ====================================================================================

// Delete one todo from DB
// route - DELETE /todos
todosRouter.delete("/", deleteOneTodo);

// ====================================================================================

// Edit one todo: its name or completeness
// route - PATCH /todos/todoId
todosRouter.patch("/:id", editOneTodo);

// ====================================================================================

module.exports = todosRouter; // export router to use it in 'server'
