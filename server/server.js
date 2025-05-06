const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const todosRouter = require("./routes/todos");
const authRouter = require("./routes/auth");

// Init Express
const app = express();

// Basic Middleware Stack
app.use(
    cors({
        origin: "http://localhost:3000", // My front-end origin (dev mode)
        credentials: true, // Allow sending cookies with requests (dev mode)
    })
);
app.use(express.json({ limit: "10kb" })); // security layer: constrain incoming JSON payloads to 10 kb, offering some protection against large-body attacks
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); // security layer: set up HTTP security headers
app.set("trust proxy", 1); // trust first proxy (during local dev)
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // within 15 minutes...  (after this period the request count will be reset)
        max: 100, // ...each IP can send up to 100 requests (if more than 100, the client will be blocked temporarily)
        message: "Too many requests from this IP, please try again later.",
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers -- Allows the client to know how many requests they have left in the current window
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers --> Modernize the headers by using RateLimit-* instead of the older X-RateLimit-* ones
    })
); // security layer: apply rate limiting to all requests
app.use(cookieParser());

// Start Server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Mongo Connect
const mongoConnString = process.env.MONGO_CONN_STRING;
const mongoPw = process.env.MONGO_ADMIN_USER_PW;
mongoose
    .connect(mongoConnString.replace("<db_password>", mongoPw))
    .then(() => console.log(`✅ db connected`))
    .catch((err) => console.error("💥 db connection error:", err));

// App Routes
app.use("/todos", todosRouter);
app.use("/auth", authRouter);
