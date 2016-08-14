/**
 * Created by adi on 11-Aug-16.
 */
/**
 * Created by adi on 30-Jul-16.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema,
    Book = require("../models/book")

var AuthorSchema = new Schema({
    firstName : {
        type : String, required: true
    },
    lastName : {
        type : String, required: true
    },
    country: {
        type : String
    },
    address: {
        type : String
    }
});

AuthorSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Book.remove({author: this._id}).exec();
    next();
});

exports.AuthorSchema = AuthorSchema;
module.exports = mongoose.model('Author', AuthorSchema, 'author');
