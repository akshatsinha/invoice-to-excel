var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bcrypt = require('bcryptjs')

var UserModel = require('../models/User')
var db = require('../models/db')
var User = db.model('User')


var app = express();


// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('[:date[iso]] :method :url :status'))


// Go to the login page
router.get('/', function(req, res) {
    res.render('login/index.jade', { csrfToken: req.csrfToken() })
});

// Get the login form data
router.post('/', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if (!user) {
            res.render('login/index.jade', {error: 'User not found!'})
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user
                res.redirect('/dashboard')
            } else {
                res.render('login/index.jade', {error: 'Invalid username or password'})
            }
        }
    })
});


module.exports = router;