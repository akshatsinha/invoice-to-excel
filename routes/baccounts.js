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

// Go to the baccounts page
// User will come here only after satisfying the requireLogin middleware
router.get('/', function(req, res) {
    BA.find({'badmin_id': req.user._id}, function(err, accounts) {
        if (err) throw err
        if (accounts.length === 0) {
            console.log('No business accounts exist yet for user: ', req.user._id)
            res.render('baccounts/index.jade', { csrfToken: req.csrfToken()})
        } else {
            res.render('baccounts/index.jade', { csrfToken: req.csrfToken(), accounts: accounts})
        }
    })

});

// Create
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
        console.log('Business Account Registration succesful: ' + newBA)
        res.redirect('/baccounts/')
    });
})

// Fetch
router.get('/get/:id', function(req, res) {
    var id = req.params.id
    BA.findOne({'_id': id}, function(err, account) {
        if (err) throw err
        res.json(account)
    })
})


// Edit
router.get('/edit/:id', function(req, res) {
    var id = req.params.id
    BA.findOne({'_id': id}, function(err, account) {
        if (err) throw err
        res.json(account)
    })
})

router.post('/edit/:_id', function(req, res) {
    BA.findOneAndUpdate({'_id': req.body._id}, {$set: req.body}, function(err, doc) {
        if (err) {
            console.log('Error in Updating BA: ' + err)
            throw err;
        }
        console.log('Business Account Successfully Updated: ', req.body)
        res.redirect('/baccounts/')
    })
})


// Delete
router.get('/delete/:id', function(req, res) {
    BA.remove({'_id': req.params.id}, function(err, doc) {
        if (err) {
            console.log('Error in Deleting BA: ' + err)
           throw err
        }
        console.log('Business Account Successfully Deleted: ', req.params.id)
        res.redirect('/baccounts/')
    })
})



// Templates used in BAaccounts
router.get('/template/edit', function(req, res) {
    res.render('baccounts/edit.jade')
})

router.get('/template/create', function(req, res) {
    res.render('baccounts/create.jade', { csrfToken: req.csrfToken()})
})

router.get('/template/delete', function(req, res) {
    res.render('baccounts/delete.jade')
})

module.exports = router