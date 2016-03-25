var UserModel = require('../models/User')
var db = require('../models/db')
var User = db.model('User')

var requireLogin = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login')
    } else {
        res.locals.user = req.user
        next()
    }
}

var isUserLoggedIn = function(req, res) {
    if (!req.user) return false
    return true
}

var auth = {
    requireLogin: requireLogin,
    isUserLoggedIn: isUserLoggedIn
}

module.exports = auth