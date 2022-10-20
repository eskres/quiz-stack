const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password is too weak..."]
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;