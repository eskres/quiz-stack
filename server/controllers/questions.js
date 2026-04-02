const {Question} = require("../models/Question");
const {Category} = require("../models/Category");


// // CREATE

exports.question_create_post = async (req, res) => {
    try {
        let question = new Question(req.body);
        await question.save();
        for (const categoryId of req.body.category) {
            const category = await Category.findById(categoryId);
            category.question.push(question);
            await category.save();
        }
        res.json({question});
    } catch(err) {
        console.log(err);
        res.send("Please try again later!!!");
    }
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

// Question Details API
exports.question_category_get = (req, res) => {
    let category = req.query.id
    Question.find({category: category})
    .then(questions => {
        res.json({questions})
    })
    .catch(err => {
        console.log(err)
    })
}

// // UPDATE

// Question Update API
exports.question_update_put = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.body.id, req.body, {new: true});
        for (const categoryId of req.body.category) {
            const category = await Category.findById(categoryId);
            category.question.push(question._id);
            await category.save();
        }
        res.json({question});
    } catch(err) {
        console.log(err);
    }
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