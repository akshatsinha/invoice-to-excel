var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

var db = require('../models/db')
var UserModel = require('../models/User')
var User = db.model('User')


var app = express();


// middleware
app.use(bodyParser.urlencoded({ extended: true }))

// Go to the register page
router.get('/', function(req, res) {
    res.render('register/index.jade', { csrfToken: req.csrfToken() })
});

// Get the register form data
router.post('/', function(req, res) {
    var user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email: req.body.email
    })

    user.save(function(err) {
        if (err) {
            console.log(err)
            var error = 'An error occurred. Please try again!'
            if (err.code === 11000) {
                error = 'Username already exists.'
            }
            res.render('register.jade', {error: error})
        } else {
            console.log('here');
            res.redirect('/login')
        }
    })

})


module.exports = router;