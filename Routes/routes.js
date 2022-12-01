const nav = require('../nav')
const { response } = require('express');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const connectionString = 'mongodb+srv://root:Passroot1234@cluster0.i0jkmej.mongodb.net/test';
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

exports.login = (req, res) => {
    User.find((error, users) => {
        if (error) return console.error(error);

        var userinfo;

        users.forEach(function(user) {
            userinfo = user;
            var username = user.userName
            if (username == req.body.username) {
                
            }
        })

        res.render('index', {
            "title": "Home",
            "nav": nav,
            "title2": userinfo,
            users
        })
    })

}


exports.createUser = (req, res) => {
    let user = new User({
        name: req.body.fname,
        lName: req.body.lname,
        userName: req.body.username,
        password: req.body.password
    });

    user.save((error, user) => {
        if (error) res.send(error);
        console.log(`${req.body.name} added`);
    });

    res.redirect('/');
}

exports.form = (req, res) => {
    res.render('createaccount', {
        "title": "Create your account",
        "nav": nav
    });
}