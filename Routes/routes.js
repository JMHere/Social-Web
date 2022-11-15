const nav = require('../nav')

exports.index = (req, res) => {
    res.render('index', {
        "title": "Home",
        "nav": nav
    });
}