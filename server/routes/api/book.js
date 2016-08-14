/**
 * Created by adi on 05-Aug-16.
 */
var db = require('../../DB');

exports.books = function (req, res) {
    console.log('*** books');

    db.getBooks(function (books) {
        res.json(books);
    });
};

exports.searchBooks = function (req, res) {
    console.log('*** search books');

    db.searchBooks(req.query, function (err, books) {
        if (err) {
            console.log('*** search err');
            res.json({'status': false});
        } else {
            console.log('*** search ok');
            res.json(books);
        }
    });
};

exports.addBook = function (req, res) {
    console.log('*** add book');
    db.addBook(req.body, function (err, book) {
        if (err) {
            console.log('*** add book error');
            res.json(err);
        }
        else {
            res.json();
        }
    });
};

exports.updateBook = function (req, res) {
    console.log('*** editBook');

    db.updateBook(req.params.id, req.body, function (err) {
        if (err) {
            console.log('*** editBook err');
            res.json({'status': false});
        } else {
            console.log('*** editBook ok');

            res.json({'status': true});
        }
    });
};

exports.getBook = function (req, res) {
    console.log('*** getBook');

    db.getBook(req.params.id, function (book) {
        res.json(book);
    })
};

exports.deleteBook = function (req, res) {
    console.log('*** delete book');

    db.deleteBook(req.params.id, function (err, book) {
        if (err) {
            console.log('*** delete book err');
            res.json({'status': false});
        } else {
            console.log('*** delete book ok');
            res.json({'status': true});
        }
    });
}

exports.top10Books = function (req, res) {
    console.log('*** books');

    db.top10Books(function (books) {
        res.json(books);
    });
}

exports.trytry = function (req, res) {
    db.trytry(function (books) {
        res.json(books);
    });
}