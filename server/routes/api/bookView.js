/**
 * Created by adi on 05-Aug-16.
 */
var db = require('../../DB');

exports.createBookView = function (book) {
    console.log('*** add book view');

    db.addBookView(book, function (err, bookView) {
        if (err) {
            console.log('*** add view book error');
        }
    });
};

