const nav = require('../nav')
const { response } = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');

mongoose.Promise = global.Promise;

const connectionString = 'mongodb://localhost/data';
mongoose.connect(connectionString, {
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Connection error'));

db.once('open', callback => {});

let userSchema = mongoose.Schema({
    name: String,
    lName: String,
    userName: String,
    password: String
})

let User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) => {

    User.find((error, users) => {
        if (error) return console.error(error);


        res.render('index', {
            "title": "Home",
            "nav": nav,
            users
        });
    })
}

exports.createUser = (req, res) => {
    let user = new User({
        name: req.body.name,
        lName: req.body.lName,
        userName: req.body.userName,
        password: req.body.password
    });

    user.save((error, user) => {
        if (error) res.send(error);
        console.log(`${req.body.name} added`);
    });

    res.redirect('/');
}

exports.login = (req, res) => {
    res.render('login')
}

exports.loginCheck = (req, res) => {
    User.find((error, users) => {
        if (error) return console.error(error);
        res.render('login');
        console.log(req.body.password)
        users.forEach(function(user) {
            let pass = user.password;
            if (pass == req.body.password) {
                console.log(1)
            }
        })
    })
}