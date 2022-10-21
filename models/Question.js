const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    choiceA: {
        type: String,
        required: true,
    },
    choiceB: {
        type: String,
        required: true,
    },
    choiceC: {
        type: String,
        required: true,
    },
    choiceD: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
},
{
    timestamps: true
});

const Question = mongoose.model("Question", questionSchema);

module.exports = {Question};