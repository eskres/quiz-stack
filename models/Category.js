const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        // unique: true
    },
    icon: {
        type: String,
        required: true,
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
},
{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {Category};