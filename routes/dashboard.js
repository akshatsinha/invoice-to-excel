var morgan = require('morgan')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var UserModel = require('../models/User')
var db = require('../models/db')
var User = db.model('User')
var auth = require('../lib/auth.js')

var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('[:date[iso]] :method :url :status'))

// Go to the dashboard page
// User will come here only after satisfying the requireLogin middleware
router.get('/', function(req, res) {
    res.render('dashboard/index.jade')
});


module.exports = router