var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var billSchema = new Schema({
    id: ObjectId,
    bill_number: {type: String},
    bill_date: {type: String},
    bill_location: {type: String},
    bill_vendor_name: {type: String},
    bill_description: {type: String},
    bill_payment_recd_date: {type: String},
    bill_amount: {type: String},
    badmin_id: { type: String, required: true },
    created_at: Date,
    updated_at: Date
})

billSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at)
        this.created_at = currentDate
    next()
})

mongoose.model('Bills', billSchema)