/**
 * Created by adi on 05-Aug-16.
 */
var bookView = require('../models/bookView'),
    book = require('../models/book'),
    db = require('../DB'),
    mongoose = require('mongoose'),
    bookApi = require('../routes/api/book'),
    authorApi = require('../routes/api/author'),
    bookViewApi = require('../routes/api/bookView');

module.exports = function(app) {
    app.get('/api/books', bookApi.books);
    app.post('/api/addBook', bookApi.addBook);
    app.post('/api/updateBook/:id', bookApi.updateBook);
    app.delete('/api/deleteBook/:id', bookApi.deleteBook);
    app.get('/api/getBook/:id', bookApi.getBook);
    app.get('/api/searchBooks/?', bookApi.searchBooks);
    app.get('/api/top10Books', bookApi.top10Books);

    app.get('/api/authors', authorApi.authors);
    app.post('/api/addAuthor', authorApi.addAuthor);
    app.post('/api/updateAuthor/:id', authorApi.updateAuthor);
    app.delete('/api/deleteAuthor/:id', authorApi.deleteAuthor);
    app.get('/api/getAuthor/:id', authorApi.getAuthor);
    app.get('/api/searchAuthors/?', authorApi.searchAuthors);
    app.get('/api/top10Authors', authorApi.top10Authors);

    app.post('/api/addView', bookViewApi.createBookView);

    app.get('/api/trytry', bookApi.trytry)
}