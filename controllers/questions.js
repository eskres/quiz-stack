const {Question} = require("../models/Question");
const {Category} = require("../models/Category");


// // CREATE

exports.question_create_post = (req, res) => {
    let question = new Question(req.body);
    question.save()
    .then(() => {
        res.json({question});
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

// // READ

// Categories Index API
exports.question_index_get = (req, res) => {
    Question.find()
    .then(categories => {
        res.json({categories})
    })
    .catch(err => {
        console.log(err);
    })
}

// Question Details API
exports.question_show_get = (req, res) => {
    Question.findById(req.query.id)
    .then(question => {
        res.json({question})
    })
    .catch(err => {
        console.log(err)
    })
}

// // UPDATE

// Question Update API
exports.question_update_put = (req, res) => {
    Question.findByIdAndUpdate(req.body.id, req.body, {new: true})
    .then((question) => {
        res.json({question})
    })
    .catch(err => {
        console.log(err)
    })
}

// // DELETE

// Question Delete API
exports.question_delete = (req, res) => {
    Question.findByIdAndDelete(req.query.id)
    .then((question) => {
        res.json({question})
    })
    .catch(err => {
        console.log(err);
    })
}