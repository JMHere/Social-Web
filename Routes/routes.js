const nav = require('../nav')

exports.index = (req, res) => {
    res.render('index', {
        "title": "Home",
        "nav": nav
    });
}

exports.form = (req, res) => {
    res.render('createaccount', {
        "title": "Create your account",
        "nav": nav
    });
}