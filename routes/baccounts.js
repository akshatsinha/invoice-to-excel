var morgan = require('morgan')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require('../models/db')

var UserModel = require('../models/User')
var User = db.model('User')

var BAModel = require('../models/BusinessAccounts')
var BA = db.model('BusinessAccounts')



var auth = require('../lib/auth.js')

var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('[:date[iso]] :method :url :status'))

// Go to the dashboard page
// User will come here only after satisfying the requireLogin middleware
router.get('/', function(req, res) {
    BA.find({'badmin_id': req.user._id}, function(err, accounts) {
        if (err) throw err
        if (accounts.length === 0) {
            console.log('No business accounts exist yet for user: ', req.user._id)
            res.render('baccounts/index.jade', { csrfToken: req.csrfToken()})
        }
        res.render('baccounts/index.jade', { csrfToken: req.csrfToken(), accounts: accounts})
    })

});

router.post('/create/', function(req, res) {
    var newBA = new BA()
    newBA.bname = req.body.bname
    newBA.baddress_first = req.body.baddress_first
    newBA.baddress_second = req.body.baddress_second
    newBA.baddress_city = req.body.baddress_city
    newBA.baddress_state = req.body.baddress_state
    newBA.baddress_country = req.body.baddress_country
    newBA.badmin_id = req.user._id
    newBA.save(function(err) {
        if (err) {
            console.log('Error in Saving BA: ' + err);
            throw err;
        }
        console.log('Business Account Registration succesful: ' + newBA);
        res.redirect('/baccounts/')
    });

})

router.get('/edit/:id', function(req, res) {
    var id = req.params.id
    BA.findOne({'_id': id}, function(err, account) {
        if (err) throw err
        res.json(account)
    })
})

module.exports = router