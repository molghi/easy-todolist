const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const router = require("./routes/todos");

// Init Express
const app = express();

// Basic Express Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use("/todos", router);
