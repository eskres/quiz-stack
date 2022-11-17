const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
},
{
    timestamps: true
});

const Score = mongoose.model("Score", questionSchema);

module.exports = {Score};