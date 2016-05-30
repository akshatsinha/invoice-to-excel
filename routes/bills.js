var morgan = require('morgan')
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models/db')

var UserModel = require('../models/User')
var User = db.model('User')

var BillModel = require('../models/Bills')
var Bill = db.model('Bills')

var auth = require('../lib/auth.js')

var app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('[:date[iso]] :method :url :status'))

// Go to the invoice page
router.get('/', function(req, res) {
    res.render('bills/index.jade');
});

// Create
router.post('/create/', function(req, res) {
    var newBill = new Bill()
    newBill.bill_number = req.body.bill_number
    newBill.bill_date = req.body.bill_date
    newBill.bill_location = req.body.bill_location
    newBill.bill_vendor_name = req.body.bill_vendor_name
    newBill.bill_description = req.body.bill_description
    newBill.bill_payment_recd_date = req.body.bill_payment_recd_date
    newBill.bill_amount = req.body.bill_amount
    newBill.badmin_id = req.user._id
    newBill.save(function(err) {
        if (err) {
            console.log('Error in Saving Bill: ' + err);
            throw err;
        }
        console.log('Bill Creation succesful: ' + newBill)
        res.redirect('/bills/')
    });
})

// Templates used in Bills
router.get('/template/edit', function(req, res) {
    res.render('bills/edit.jade')
})

router.get('/template/create', function(req, res) {
    res.render('bills/create.jade', { csrfToken: req.csrfToken()})
})

router.get('/template/delete', function(req, res) {
    res.render('bills/delete.jade')
})


module.exports = router;