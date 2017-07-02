'user strict';
var index = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var home = require('./routes/home');
var signout = require('./routes/signout');

var checkSignedIn = function (req, res,next) {
    if (req.session.userid) {
        next();     //If session exists, proceed to page
    } else {
        res.redirect('/index');
    }
}

module.exports = function (app) {
    app.use('/index', index);
    app.use('/signin', signin);
    app.use('/signout', signout);   
    app.use('/users', checkSignedIn, users);
    app.use('/home', checkSignedIn, home);
};