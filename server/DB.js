/**
 * Created by adi on 30-Jul-16.
 */

var mongoose = require("mongoose"),
    BookService = require('./services/book'),
    AuthorService = require('./services/author'),
    BoookViewService = require('./services/bookView')


//connect to database
module.exports = {
    // initialize DB
    startup: function (dbUrl) {
        mongoose.connect(dbUrl);
        // Check connection to mongoDB
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');
        });
    },

    // disconnect from database
    closeDB: function () {
        mongoose.disconnect();
    },

    trytry: BookService.trytry,
    // ** book
    addBook: BookService.addBook,
    getBooks: BookService.getBooks,
    deleteBook: BookService.deleteBook,
    updateBook: BookService.updateBook,
    getBook: BookService.getBook,
    searchBooks: BookService.searchBooks,
    top10Books: BookService.top10Books,

    // **** author
    addAuthor: AuthorService.addAuthor,
    getAuthors: AuthorService.getAuthors,
    deleteAuthor: AuthorService.deleteAuthor,
    updateAuthor: AuthorService.updateAuthor,
    getAuthor: AuthorService.getAuthor,
    searchAuthors: AuthorService.searchAuthors,
    top10Authors: AuthorService.top10Authors,

    addBookView: BoookViewService.addBookView

}
