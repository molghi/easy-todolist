const Todo = require("../models/Todo"); // bring in the model from my schema
const validator = require("validator"); // bring in external validator for input sanitisation

// ====================================================================================

const checkLoggedIn = async (req, res, next) => {
    if (!req.cookies.authToken) {
        console.log("Access Denied: Log in to perform this action");
        return res.status(401).json({ message: "Log in to perform this action" });
    }
    console.log("authToken is present");
    next();
};

// ====================================================================================

// Read all to-dos from the db
const readAllTodos = async (req, res, next) => {
    try {
        if (!req.cookies.authToken) return res.status(401).json({ message: "Log in to perform this action" });
        const allTodos = await Todo.find({ userId: req.params.userId }); // select all docs that belong to this userId
        res.status(200).json(allTodos); // return them
    } catch (err) {
        res.status(500).json({ error: "💥💥💥 Reading all failed" });
    }
};

// ====================================================================================

// Add new to-do to the db
const addNewTodo = async (req, res, next) => {
    try {
        const todoName = req.body.todoName;
        const cleanTodoName = validator.escape(todoName.trim()); // sanitise input: remove potentially harmful characters and escape HTML entities
        const newTodo = new Todo({ todoName: cleanTodoName, userId: req.body.userId }); // create a new instance of the Todo model (new doc)
        const savedTodo = await newTodo.save(); // insert the doc into the db (collection)
        res.status(201).json(savedTodo); // return this doc
    } catch (err) {
        res.status(500).json({ error: "💥💥💥 Insertion failed" });
    }
};

// ====================================================================================

const deleteOneTodo = async (req, res, next) => {
    try {
        const idToDelete = req.body.id; // get what's passed with request body
        const resp = await Todo.findByIdAndDelete(idToDelete); // find by id and delete
        res.status(204).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "💥💥💥 Deletion failed" });
    }
};

// ====================================================================================

const editOneTodo = async (req, res, next) => {
    try {
        let msg = "";
        const idToEdit = req.params.id; // get what's passed in url as a param

        // case 1: editing only todo name
        const newText = req.body.todoName; // get what's passed with request body
        const cleanTodoName = validator.escape(newText.trim()); // sanitise input: remove potentially harmful characters and escape HTML entities

        // case 2: editing its completed
        const dateCompleted = req.body.dateCompleted;
        const isCompleted = req.body.isCompleted;

        if (cleanTodoName) {
            const resp = await Todo.findByIdAndUpdate(idToEdit, { todoName: cleanTodoName }, { new: true }); // find by id and update only todo text
            msg = "Todo's text edited successfully";
        } else {
            const resp = await Todo.findByIdAndUpdate(idToEdit, { dateCompleted, isCompleted }, { new: true }); // find by id and update its completed
            msg = "Todo completed edited successfully";
        }

        res.status(200).json({ message: msg });
    } catch (err) {
        res.status(500).json({ error: "💥💥💥 Editing failed" });
    }
};

// ====================================================================================

module.exports = { readAllTodos, addNewTodo, deleteOneTodo, editOneTodo, checkLoggedIn };
