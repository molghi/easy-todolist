const mongoose = require("mongoose");

// Establish schema
const todoSchema = new mongoose.Schema({
    todoName: String,
    dateCreated: { type: Date, default: Date.now }, // specify data type and default value
    dateCompleted: { type: Date, default: null },
    isCompleted: { type: Boolean, default: false },
});

// Export model from the schema
module.exports = mongoose.model("Todo", todoSchema);
