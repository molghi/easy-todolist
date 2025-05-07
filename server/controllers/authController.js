const bcrypt = require("bcrypt"); // bring in the pw hasher
const User = require("../models/User"); // bring in the schema and model
const validator = require("validator"); // bring in external validator
const jwt = require("jsonwebtoken"); // bring in json web tokens
require("dotenv").config({ path: "./config.env" });

// ====================================================================================

const authHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (req.params.specifier === "sign-up") {
            return signUp(req, res, next, username, password);
        } else if (req.params.specifier === "log-in") {
            return logIn(req, res, next, username, password);
        }

        res.send("all good");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};

// ====================================================================================

// not a middleware
const signUp = async (req, res, next, username, password) => {
    try {
        const passwordIsValid = /^[A-Za-z0-9]{8,}$/.test(password); // Validate only alphanumeric chars
        if (!passwordIsValid) {
            return res.status(400).json({ message: "Password must contain only alphanumerics and be at least 8 chars long" });
        }
        const salt = await bcrypt.genSalt(10); // Generate salt (a random string added to a pw before hashing)
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password
        const newUser = new User({ username, password: hashedPassword }); // Create a new instance of the User model (new doc)
        const savedUser = await newUser.save(); // Insert the doc into the db (collection)
        savedUser.password = undefined; // Remove the password field before returning
        req.body.user = savedUser; // set it up on the req.body so the next middleware could use it
        return next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};

// ====================================================================================

// not a middleware
const logIn = async (req, res, next, username, password) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username }); // Query the db by username
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password); // Compare input password with stored hashed password
        existingUser.password = undefined; // Remove the password field before returning
        req.body.user = existingUser; // set it up on the req.body so the next middleware could use it
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect credentials" });
        }
        return next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};

// ====================================================================================

const checkIfUserExists = async (req, res, next) => {
    if (req.params.specifier !== "sign-up") return next();

    const { username } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
    }

    next();
};

// ====================================================================================

// sign jwt token, set cookie, return token and username
const signToken = async (req, res, next) => {
    try {
        const statusCode = req.params.specifier === "sign-up" ? 201 : 200;
        const payload = { userId: req.body.user._id }; // Create JWT payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }); // Sign the token with a secret key
        res.cookie("authToken", token, {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            // secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(statusCode).json({
            token,
            username: req.body.user.username,
            userId: req.params.specifier === "log-in" && req.body.user._id,
        }); // Return the token in the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// ====================================================================================

// clear the auth cookie
const clearCookie = async (req, res, next) => {
    try {
        res.clearCookie("authToken", { httpOnly: true });
        return res.status(200).json({ message: "Cookie cleared" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error clearing cookie" });
    }
};

// ====================================================================================

// check if the auth cookie is there
const checkCookie = async (req, res, next) => {
    try {
        if (!req.cookies.authToken) {
            return res.status(401).json({ message: "No auth cookie" }); // check for the absence of it
        }
        const decoded = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET); // extract the user's ID from req.cookies.authToken -- verify and decode the JWT.
        req.userId = decoded.userId;
        res.status(200).json({ message: decoded.userId });
        // read the authToken cookie -- verify it via jwt.verify() -- return user info or status
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error checking cookie" });
    }
};

// ====================================================================================

const validateInputs = (req, res, next) => {
    // console.log(req.params.specifier);
    const { username, password, passwordRepeated } = req.body;
    const usernameIsFine = /^[A-Za-z][A-Za-z0-9]{2,}$/.test(username);
    // const passwordIsFine = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const passwordIsFine = validator.matches(password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    if (!validator.isAlphanumeric(username) || username.length < 3) return res.status(400).json({ message: "Invalid username" });

    if (req.params.specifier === "sign-up") {
        const passwordRepeatedIsFine = password === passwordRepeated;
        if (usernameIsFine && passwordIsFine && passwordRepeatedIsFine) {
            req.body.inputsAreValid = true;
            next();
        } else {
            res.status(400).json({ message: "Invalid input" });
        }
    } else if (req.params.specifier === "log-in") {
        if (usernameIsFine && passwordIsFine) {
            req.body.inputsAreValid = true;
            next();
        } else {
            res.status(400).json({ message: "Invalid input" });
        }
    }
};

// ====================================================================================

module.exports = { validateInputs, authHandler, checkIfUserExists, signToken, clearCookie, checkCookie };
