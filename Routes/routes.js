const nav = require('../nav')

exports.index = (req, res) => {
    res.render('index', {
        "title": "Home",
        "nav": nav
    });
}

exports.login = (req, res) => {
    res.render('login')
}