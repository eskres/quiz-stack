const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    choices: {
        type: Array,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
},
{
    timestamps: true
});

const Question = mongoose.model("Question", questionSchema);

module.exports = {Question};