const mongoose = require("mongoose");

// Establish schema
const todoSchema = new mongoose.Schema({
    todoName: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }, // specify data type and default value
    dateCompleted: { type: Date, default: null },
    isCompleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // 'mongoose.Schema.Types.ObjectId' refs the default _id field Mongoose generates for each document;
    // ref: 'User' serves the analogue of a foreign key, allowing relations between collections and enabling .populate() to retrieve linked documents.
});

// Export model from the schema
module.exports = mongoose.model("Todo", todoSchema);
