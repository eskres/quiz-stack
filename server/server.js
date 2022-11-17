// REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const flash = require('connect-flash');
require("dotenv").config();
const cors = require('cors');

// INTIALIZE
const app = express();

// USE DEPENDANCIES
app.use(flash());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());


// EXPRESS SESSION
let session = require("express-session");

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 3600000}
}))

// IMPORT ROUTES
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const questionsRouter = require('./routes/questions');
const scoresRouter = require('./routes/scores');

// MOUNT ROUTES
app.use('/', authRouter);
app.use('/', categoriesRouter);
app.use('/', questionsRouter);
app.use('/', scoresRouter);

// PORT
const PORT = process.env.PORT;

app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// DATABASE
mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("MongoDB connected!!!");
    }
);

app(cors());

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});