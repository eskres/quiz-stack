const {Score} = require("../models/Score");
const {User} = require("../models/Used");


// // CREATE

exports.score_create_post = (req, res) => {
    let score = new Score(req.body);
    score.save()
    .then(() => {
        User.findById(req.body.user)
        .then(user => {
            user.score.push(score);
            user.save();
            res.json({score});
        })
    }) 
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

// // READ

// Categories Index API
exports.score_index_get = (req, res) => {
    Score.find()
    .then(categories => {
        res.json({categories})
    })
    .catch(err => {
        console.log(err);
    })
}

// Score Details API
exports.score_show_get = (req, res) => {
    Score.findById(req.query.id)
    .then(score => {
        res.json({score})
    })
    .catch(err => {
        console.log(err)
    })
}

// Score Details API
exports.score_user_get = (req, res) => {
    let user = req.query.id
    Score.find({user: user})
    .then(scores => {
        res.json({scores})
    })
    .catch(err => {
        console.log(err)
    })
}

// // UPDATE

// Score Update API
exports.score_update_put = (req, res) => {
    Score.findByIdAndUpdate(req.body.id, req.body, {new: true})
    .then((score) => {
        User.findById(req.body.user)
        .then(user => {
            user.score.push(score);
            user.save();
            res.json({score});
        })
        res.json({score})
    })
    .catch(err => {
        console.log(err)
    })
}

// // DELETE

// Score Delete API
exports.score_delete = (req, res) => {
    Score.findByIdAndDelete(req.query.id)
    .then((score) => {
        res.json({score})
    })
    .catch(err => {
        console.log(err);
    })
}