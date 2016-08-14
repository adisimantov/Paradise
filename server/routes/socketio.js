/**
 * Created by adi on 12-Aug-16.
 */

bookViewApi = require('../routes/api/bookView'),

module.exports = function(io) {
    io.sockets.on('connection', function (socket) {
        socket.on('login', function (user) {
            console.log("connect? %d with password %s",
                user.username, user.password);
            socket.emit('loggedin', user);
        });
        socket.on('logout', function () {
            console.log("logout");
            socket.emit('loggedout');
        });
        socket.on('view',function(book){
            bookViewApi.createBookView(book);
        });
    });
}
