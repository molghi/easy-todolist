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
const path = require("path");

// Init Express
const app = express();

// Serve the React app
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Basic Middleware Stack
const allowedOrigins = [
    "http://localhost:3000",
    "https://easy-todolist.vercel.app",
    "https://easy-todolist-production-a58c.up.railway.app",
    "https://cryptic-caverns-09109-a6e8262f9747.herokuapp.com",
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Allow sending cookies with requests
        methods: ["GET", "POST", "PATCH", "DELETE"],
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
const port = process.env.PORT || 5000;
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
