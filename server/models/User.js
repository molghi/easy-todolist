const mongoose = require("mongoose");

// Establish schema
const userSchema = new mongoose.Schema({
    username: {
        type: String /* username rules: must start only with a letter, must contain only alphanumerics, must sanitise against any malicious code injections */,
        required: [true, "Username is required"],
        minlength: [3, "Minimum length is 3 chars"],
        maxlength: [30, "Maximum length is 30 chars"],
        match: [/^[A-Za-z][A-Za-z0-9]*$/, "Username must start with a letter and contain only alphanumerics"], // validation
    },
    password: {
        type: String /* password rules: must contain only alphanumerics and no other characters, must sanitise against any malicious code injections */,
        required: [true, "Password is required"],
        minlength: [8, "Minimum length is 8 chars"],
        // match: [/^[A-Za-z0-9]+$/, "Password must contain only alphanumerics"],
    },
    // passwordRepeat: {
    //     type: String,
    //     required: false, // false because the log in form has no such field
    //     minlength: [8, "Minimum length is 8 chars"],
    //     match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "Password must contain only alphanumerics"],
    //     validate: {
    //         validator: function (value) {
    //             return value === this.password;
    //         },
    //         message: "Passwords do not match",
    //     },
    // },
    created: { type: Date, default: Date.now },
});

// Export model from the schema
module.exports = mongoose.model("User", userSchema);
