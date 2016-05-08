var morgan = require('morgan')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require('../models/db')

var DealersModel = require('../models/Dealers.js')
var Dealer = db.model('Dealer')

var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('[:date[iso]] :method :url :status'))

// Go to the dealers page
// User will come here only after satisfying the requireLogin middleware
router.get('/', function(req, res) {
    Dealer.find({'dadmin_id': req.user._id}, function(err, dealers) {
        if (err) throw err
        if (dealers.length == 0) {
            console.log('No dealer exists yet for user: ', req.user._id)
            res.render('dealers/index.jade', { csrfToken: req.csrfToken()})
        } else {
            res.render('dealers/index.jade', {csrfToken: req.csrfToken(), dealers: dealers})
        }
    })
})

// Create
router.post('/create/', function(req, res) {
    var newDealer = new Dealer()
    newDealer.dname = req.body.dname
    newDealer.daddress_first = req.body.daddress_first
    newDealer.daddress_second = req.body.daddress_second
    newDealer.daddress_city = req.body.daddress_city
    newDealer.daddress_state = req.body.daddress_state
    newDealer.daddress_country = req.body.daddress_country
    newDealer.dadmin_id = req.user._id
    newDealer.save(function(err) {
        if (err) {
            console.log('Error in Saving Dealer: ' + err);
            throw err;
        }
        console.log('Dealer Registration succesful: ' + newDealer)
        res.redirect('/dealers/')
    });
})

// Fetch
router.get('/get/:id', function(req, res) {
    var id = req.params.id
    Dealer.findOne({'_id': id}, function(err, dealer) {
        if (err) throw err
        res.json(dealer)
    })
})

// Edit
router.get('/edit/:id', function(req, res) {
    var id = req.params.id
    Dealer.findOne({'_id': id}, function(err, dealer) {
        if (err) throw err
        res.json(dealer)
    })
})

router.post('/edit/:_id', function(req, res) {
    Dealer.findOneAndUpdate({'_id': req.body._id}, {$set: req.body}, function(err, doc) {
        if (err) {
            console.log('Error in Updating Dealer: ' + err)
            throw err;
        }
        console.log('Dealer Successfully Updated: ', req.body)
        res.redirect('/dealers/')
    })
})

// Delete
router.get('/delete/:id', function(req, res) {
    Dealer.remove({'_id': req.params.id}, function(err, doc) {
        if (err) {
            console.log('Error in Deleting Dealer: ' + err)
           throw err
        }
        console.log('Dealer Successfully Deleted: ', req.params.id)
        res.redirect('/dealers/')
    })
})


// Templates used in BAaccounts
router.get('/template/edit', function(req, res) {
    res.render('dealers/edit.jade')
})

router.get('/template/create', function(req, res) {
    res.render('dealers/create.jade', { csrfToken: req.csrfToken()})
})

router.get('/template/delete', function(req, res) {
    res.render('dealers/delete.jade')
})

module.exports = router