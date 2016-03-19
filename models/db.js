var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/i2e');

db.on('error', function(err){
    if(err) throw err;
});

db.once('open', function callback () {
    console.info('Mongo db connected successfully');
});

module.exports = db;
