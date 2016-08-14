/**
 * Created by adi on 05-Aug-16.
 */
var Book = require('../models/book');
var Author = require('../models/author');
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


module.exports = {
    trytry: function (callback) {
    },

    top10Books: function (callback) {
        Book.aggregate(
            [
                {
                    $project: {
                        totalViews: {$size: '$views'},
                        ISBN: 1,
                        title: 1,
                        author: 1,
                        series: 1,
                        bookNumber: 1,
                        genere: 1,
                        publisher: 1,
                        publicationYear: 1,
                        summery: 1
                    }
                },
                {$sort: {totalViews: -1}},
                {$limit: 10}
            ]).exec(
            function (err, results) {
                if (err) {
                    return console.error(err);
                }
                Author.populate(results, {path: 'author'}, function (err, thrresults) {
                    callback(thrresults);
                });
            });
    },


    // get all the books
    getBooks: function (callback) {
        console.log('------ DB.getBooks');
        Book.find().populate('author').exec(function (err, books) {
            if (err) {
                return console.error(err);
            }
            callback(books);
        });
    },

    getBook: function (callback) {
        console.log('------ DB.getBook');
        Book.findOne({'id': id}).populate('author').exec(function (err, book) {
            if (err) {
                return console.error(err);
            }
            callback(book);
        });
    },

    // insert a book
    addBook: function (req_body, callback) {
        console.log('------ DB.addBook');

        var book = new Book();

        book.ISBN = req_body.ISBN;
        book.title = req_body.title;
        book.author = req_body.author._id;
        book.series = req_body.series;
        book.bookNumber = req_body.bookNumber;
        book.genere = req_body.genere;
        book.publisher = req_body.publisher;
        book.publicationYear = req_body.publicationYear;
        book.summery = req_body.summery;
        book.views = [];

        book.save(function (err, book) {
            if (err) {
                console.log('*** add book err: ' + err);
                return callback(err);
            }
            callback(null, book);
        });
    },

    deleteBook: function (id, callback) {
        console.log('*** DB.deleteBook');
        /*Book.findOne({'_id': id}, function(err, book) {
            book.remove( function (err, book) {
                callback(err, null);
            });
        });
*/
        Book.remove({'_id': id}, function (err, book) {
            callback(err, null);
        });
    },

    updateBook: function (id, req_body, callback) {
        console.log('*** DB.UpdateBook');

        Book.findById(id, function (err, book) {
            if (err) {
                return callback(err);
            }

            book.title = req_body.title || book.title;
            book.author = req_body.author || book.author;
            book.ISBN = req_body.ISBN || book.ISBN;
            book.series = req_body.series || book.series;
            book.bookNumber = req_body.bookNumber || book.bookNumber;
            book.genere = req_body.genere || book.genere;
            book.publisher = req_body.publisher || book.publisher;
            book.publicationYear = req_body.publicationYear || book.publicationYear;
            book.summery = req_body.summery || book.summery;

            book.save(function (err) {
                if (err) {
                    console.log('*** DB.updateBook err: ' + err);
                    return callback(err);
                }

                callback(null);
            });

        });
    },

    searchBooks: function (params, callback) {
        var myFilter = {};
        if (params.title && params.title !== "")
            myFilter['title'] = params.title;
        if (params.author && params.author !== "")
            myFilter['author'] = params.authorId;
        if (params.series && params.series !== "")
            myFilter['series'] = params.series;
        console.log('*** DB.getBooksByFilter');
        Book.find(myFilter).populate('author').exec(function (err, books) {
            callback(null, books);
        });
    },

    top5Books: function () {

    }

};