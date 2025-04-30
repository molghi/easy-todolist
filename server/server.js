const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

// Init Express
const app = express();

// Express Middleware
app.use(cors());
app.use(express.json());

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

//
//
//

// Define a simple Mongoose schema and instantiate a model
// const TestSchema = new mongoose.Schema({
//     message: String,
// });

// const Test = mongoose.model("Test", TestSchema);

// Push a test document
// const testDoc = new Test({ message: "Test test" });
// testDoc
//     .save()
//     .then(() => console.log("Document inserted"))
//     .catch((err) => console.error("Insertion failed:", err));

// Fetch and display it
// Test.find()
//     .then((docs) => console.log("Documents:", docs))
//     .catch((err) => console.error("Retrieval failed:", err));
