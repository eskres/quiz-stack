const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({ 
    emailAddress: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, minlength: [6, "Your password is too weak..."] },
    score: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}] },
    { timestamps: true });
    
    const User = mongoose.model("User", userSchema);
    module.exports = { User };