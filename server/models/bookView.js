/**
 * Created by adi on 05-Aug-16.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var BookViewSchema = new Schema({
    date: {
        type: Date, default: Date.now
    },
    book : { type: Schema.ObjectId, ref: 'Book' }

});

module.exports = mongoose.model('BookView', BookViewSchema);