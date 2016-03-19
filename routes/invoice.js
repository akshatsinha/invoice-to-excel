var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Go to the invoice page
router.get('/', function(req, res) {
    res.render('invoice/index.jade');
});



module.exports = router;