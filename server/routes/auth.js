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

// sign up or log in
// route - POST /auth/sign-up  or  POST /auth/log-in
authRouter.post("/:specifier", checkIfUserExists, authHandler, signToken);

// ====================================================================================

// clear cookie on log out
// route - GET /auth/log-out
authRouter.get("/log-out", clearCookie);

// ====================================================================================

// check if cookie is there
// route - GET /auth/verify
authRouter.get("/verify", checkCookie);

// ====================================================================================

module.exports = authRouter; // export router to use it in 'server'
