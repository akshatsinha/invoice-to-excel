var UserModel = require('../models/User')
var db = require('../models/db')
var User = db.model('User')

// To remove password from going back to the client
var updateUserObjIfLoggedIn = function(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ username: req.session.user.username }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password
                req.session.user = req.user
                res.locals.user = req.user
            }
            next()
        })
    } else {
        next()
    }
}

var requireLogin = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

var auth = {
    requireLogin: requireLogin,
    updateUserObjIfLoggedIn: updateUserObjIfLoggedIn
}

module.exports = auth