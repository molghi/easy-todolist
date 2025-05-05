const express = require("express");
const authRouter = express.Router(); // bring in express router

const {
    validateInputs,
    authHandler,
    checkIfUserExists,
    signToken,
    clearCookie,
    checkCookie,
} = require("../controllers/authController"); // bring in route handlers

// ====================================================================================

authRouter.post("/:specifier", checkIfUserExists, authHandler, signToken);

// ====================================================================================

authRouter.get("/log-out", clearCookie);

// ====================================================================================

authRouter.get("/verify", checkCookie);

// ====================================================================================

module.exports = authRouter; // export router to use it in 'server'
