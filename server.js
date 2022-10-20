// REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
require("dotenv").config();



// INTIALIZE
const app = express();

// USE DEPENDANCIES
app.use(flash());
app.use(express.static("public"));
app.use(express.json())


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

// MOUNT ROUTES
app.use('/', authRouter);

// PORT
const PORT = process.env.PORT;

// DATABASE
mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("MongoDB connected!!!")
    }
);

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});