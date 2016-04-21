var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var bAccountsSchema = new Schema({
    id: ObjectId,
    bname: { type: String, required: true },
    baddress_first: { type: String, required: false },
    baddress_second: { type: String, required: false },
    baddress_city: { type: String, required: false },
    baddress_state: { type: String, required: false },
    baddress_country: { type: String, required: false },
    badmin_id: { type: String, required: true },
    created_at: Date,
    updated_at: Date
})

bAccountsSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at)
        this.created_at = currentDate
    next()
})

// Register BusinessAccounts and its schema with mongoose
// This is the name of the created collection
mongoose.model('BusinessAccounts', bAccountsSchema)
