/**
 * Created by adi on 05-Aug-16.
 */
var BookView = require('../models/bookView'),
Book = require('../models/book');

module.exports = {

    // insert a book view
    addBookView: function (book, callback) {
        console.log('------ DB.addBookView');

        var bookView = new BookView();

        bookView.book = book._id;
        bookView.save(function (err, bookView) {
            if (err) {
                console.log('*** add bookView err: ' + err);
                return callback(err);
            }
            Book.findByIdAndUpdate(
                book._id,
                {$push: {"views": bookView}},
                {safe: true, upsert: true, new : true}
            , function (err){
                    if (err) {
                        console.log('*** add book bookView err: ' + err);
                        return callback(err);
                    }
                });
            callback(null, bookView);
        });
    },

}