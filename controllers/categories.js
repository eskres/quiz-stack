const {Category} = require("../models/Category");
const {Question} = require("../models/Question");

// // CREATE

exports.category_create_post = (req, res) => {
    let category = new Category(req.body);
    category.save()
    .then(() => {
        res.json({category});
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

// // READ

// Categories Index API
exports.category_index_get = (req, res) => {
    Category.find()
    .then(categories => {
        res.json({categories})
    })
    .catch(err => {
        console.log(err);
    })
}

// Category Details API
exports.category_show_get = (req, res) => {
    Category.findById(req.query.id)
    .then(category => {
        res.json({category})
    })
    .catch(err => {
        console.log(err)
    })
}

// // UPDATE

// Category Update API
exports.category_update_put = (req, res) => {
    Category.findByIdAndUpdate(req.body.id, req.body, {new: true})
    .then((category) => {
        res.json({category})
    })
    .catch(err => {
        console.log(err)
    })
}

// // DELETE

// Category Delete API
exports.category_delete = (req, res) => {
    Category.findByIdAndDelete(req.query.id)
    .then((category) => {
        res.json({category})
    })
    .catch(err => {
        console.log(err);
    })
}