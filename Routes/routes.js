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
        res.render('index', {
        });
}

exports.createPage = (req, res) => {
    res.render('createaccount',{
    })
}

exports.login = (req, res) => {
    User.find((error, users) => {
        if (error) return console.error(error);

        var userinfo;
        var userset;
        var check = false;

        users.forEach(function(user) {
            let username = user.userName
            let password = user.password
            console.log(user)
            if (username == req.body.username && password == req.body.password) {
                userinfo = user;

                userset = {
                    userName: userinfo.userName,
                    fname: userinfo.name
                }
                check = true;
            } else {
                
            }
        })
        
        console.log(check)

        if(check == true) {
            res.render('home', {
                "title": "Home",
                "nav": nav,
                "user": userset,
                users
            })
        } else {
            res.render('index', {
                "loginF": "Invalid Credentials"
            })
        }
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

exports.search = (req, res) => {
    res.render('search', {
        "title": "Search for friends or other users",
        "nav": nav
    });
}

exports.searchForm = (req, res) => {
    User.find((error, users) => {
        if (error) return console.error(error);
        var userinfo;
        users.forEach(function(user) {
            userinfo = user;
            var username = user.userName
            if (username == req.body.username) {
                document.getElementById
            }
        })
        res.render('search', {
            "nav": nav,
        })
    })
}

exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, joke) => {
        if(err) return console.error(err);
    })
    res.redirect('/')
}