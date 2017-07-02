'user strict';
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var home = require('./routes/home');

module.exports = function (app) {
    app.use('/', index);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/home', home);
};