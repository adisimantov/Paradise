/**
 * Created by adi on 05-Aug-16.
 */
var db = require('../../DB');

exports.authors = function (req, res) {
    console.log('*** authors');

    db.getAuthors(function (authors) {
        res.json(authors);
    });
};

exports.searchAuthors = function (req, res) {
    console.log('*** search authors');

    db.searchAuthors(req.query, function (err, authors) {
        if (err) {
            console.log('*** search err');
            res.json({'status': false});
        } else {
            console.log('*** search ok');
            res.json(authors);
        }
    });
};

exports.addAuthor = function (req, res) {
    console.log('*** add author');

    db.addAuthor(req.body, function (err, author) {
        if (err) {
            console.log('*** add author error');
            res.json(err);
        }
        else {
            res.json();
        }
    });
};

exports.updateAuthor = function (req, res) {
    console.log('*** editAuthor');

    db.updateAuthor(req.params.id, req.body, function (err) {
        if (err) {
            console.log('*** editAuthor err');
            res.json({'status': false});
        } else {
            console.log('*** editAuthor ok');

            res.json({'status': true});
        }
    });
};

exports.getAuthor = function (req, res) {
    console.log('*** getAuthor');

    db.getAuthor(req.params.id, function (author) {
        res.json(author);
    })
};

exports.deleteAuthor = function (req, res) {
    console.log('*** delete author');

    db.deleteAuthor(req.params.id, function (err, author) {
        if (err) {
            console.log('*** delete author err');
            res.json({'status': false});
        } else {
            console.log('*** delete author ok');
            res.json({'status': true});
        }
    });
},
    
exports.top10Authors = function (req, res) {
    console.log('*** authors');

    db.top10Authors(function (authors) {
        res.json(authors);
    });
};

