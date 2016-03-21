var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var LocalStrategy = require('passport-local')

var UserModel = require('../models/User')
var db = require('../models/db')
var User = db.model('User')

var app = express();

// middleware
app.use(morgan('[:date[iso]] :method :url :status'))

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

passport.use('login', new LocalStrategy({passReqToCallback : true},
    function(req, username, password, done) {
        User.findOne({ 'username':  username }, function(err, user) {
            if (err) return done(err);
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false, req.flash('message', 'User Not found.'));
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password'));
            }
            return done(null, user);
        });
    }
));


// Go to the login page
router.get('/', function(req, res) {
    res.render('login/index.jade', { csrfToken: req.csrfToken(), message: req.flash('message') })
});

// User submits the login form
router.post('/', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash : true
}))


module.exports = router;
