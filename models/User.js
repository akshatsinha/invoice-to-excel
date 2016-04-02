var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    id: ObjectId,
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    is_admin: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
})

userSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at)
        this.created_at = currentDate
    next()
})

// Register UserModel and its schema with mongoose
// This is the name of the created collection
mongoose.model('User', userSchema)
