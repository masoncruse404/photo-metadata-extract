const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exists"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    token: {
        type: String,
        unique: true,
    },
    likes: {
        type: [String],
    }
})

const User = mongoose.model.Users || mongoose.model("Users", UserSchema);
module.exports =  User;