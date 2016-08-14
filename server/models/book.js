/**
 * Created by adi on 30-Jul-16.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var BookSchema = new Schema({
    ISBN: {
        type: Number, required: true, unique: true
    },
    title: {
        type: String, required: true, trim: true
    },
    author : { type: Schema.ObjectId, ref: 'Author' , required: true},
    series: {
        type: String, required: false, trim: true
    },
    bookNumber: {
        type: Number, required: false
    },
    genere: {
        type: String, required: false, trim: true
    },
    publisher: {
        type: String, required: false, trim: true
    },
    publicationYear: {
        type: Number, required: false
    },
    summery: {
        type: String, required: false, trim: true
    },
    views: [{type: mongoose.Schema.Types.ObjectId, ref: 'BookView'}]

});

exports.BookSchema = BookSchema;
module.exports = mongoose.model('Book', BookSchema);
