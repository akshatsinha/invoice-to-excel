var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var dealersSchema = new Schema({
    id: ObjectId,
    dname: { type: String, required: true },
    daddress_first: { type: String, required: false },
    daddress_second: { type: String, required: false },
    daddress_city: { type: String, required: false },
    daddress_state: { type: String, required: false },
    daddress_country: { type: String, required: false },
    dadmin_id: { type: String, required: true },
    created_at: Date,
    updated_at: Date
})

dealersSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at)
        this.created_at = currentDate
    next()
})

// Register Dealers and its schema with mongoose
// This is the name of the created collection
mongoose.model('Dealer', dealersSchema)
