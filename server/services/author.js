/**
 * Created by adi on 05-Aug-16.
 */
var Author = require('../models/author'),
    Book = require('../models/book');

module.exports = {
    top10Authors: function (callback) {
        Book.aggregate(
            [
                {
                    $project: {
                        totalViews: {$size: '$views'},
                        author: 1,
                    }
                },
                {
                    $group: {
                        _id: "$author",
                        totalViews: {$sum: "$totalViews"}
                    }
                },
                {$sort: {totalViews: -1}},
                {$limit: 10},
            ]).exec(
            function (err, results) {
                if (err) {
                    return console.error(err);
                }
                Author.populate(results, {path: '_id'}, function (err, thrresults) {
                    callback(thrresults);
                });
            });
    },

    // get all the books
    getAuthors: function (callback) {
        console.log('------ DB.getAuthors');
        Author.find(function (err, authors) {
            if (err) {
                return console.error(err);
            }
            callback(authors);
        });
    },

    getAuthor: function (callback) {
        console.log('------ DB.getAuthor');
        Author.findOne({'id': id}, function (err, author) {
            if (err) {
                return console.error(err);
            }
            callback(author);
        });
    },

    // insert an author
    addAuthor: function (req_body, callback) {
        console.log('------ DB.addAuthor');

        var author = new Author();

        author.firstName = req_body.firstName;
        author.lastName = req_body.lastName;
        author.address = req_body.address;
        author.country = req_body.country;

        author.save(function (err, author) {
            if (err) {
                console.log('*** add author err: ' + err);
                return callback(err);
            }
            callback(null, author);
        });
    },

    deleteAuthor: function (id, callback) {
        console.log('*** DB.deleteAuthor');
        Author.findOne({'_id': id}, function (err, author) {
            author.remove(function (err, author) {
                callback(err, author);
            });
        });
        /*
         Author.remove({'_id': id}, function (err, author) {
         callback(err, null);
         });*/
    },

    updateAuthor: function (id, req_body, callback) {
        console.log('*** DB.UpdateAuthor');

        Author.findById(id, function (err, author) {
            if (err) {
                return callback(err);
            }

            author.firstName = req_body.firstName || author.firstName;
            author.lastName = req_body.lastName || author.lastName;
            author.address = req_body.address || author.address;
            author.country = req_body.country || author.country;

            author.save(function (err) {
                if (err) {
                    console.log('*** DB.updateAuthor err: ' + err);
                    return callback(err);
                }

                callback(null);
            });

        });
    },

    searchAuthors: function (params, callback) {
        var myFilter = {};
        if (params.firstName && params.firstName !== "")
            myFilter['firstName'] = params.firstName;
        if (params.lastName && params.lastName !== "")
            myFilter['lastName'] = params.lastName;
        if (params.country && params.country !== "")
            myFilter['country'] = params.country;
        console.log('*** DB.getAuthorByFilter');
        console.log(params.itemsPerPage);
        console.log(params.pageNumber);
        Author.find(myFilter, function (err, authors) {
            callback(null, authors);

        });
    }
};