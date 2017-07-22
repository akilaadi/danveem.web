///set DEBUG=handle & node .\bin\www

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var DynamoDBStore = require('connect-dynamodb')({ session: session });
var env = require('node-env-file');

env(__dirname + '/.env');

var app = express();
port = process.env.PORT || 4000
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new DynamoDBStore(
        {
            AWSConfigJSON: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION
            }
        }
    ),
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false
}));
app.use(function (req, res, next) {
    res.locals.userFname = req.session.userFname;
    res.locals.userid = req.session.userid;
    res.locals.email = req.session.email;
    res.locals.name = req.session.name;
    res.locals.apiServiceUrl = process.env.API_SERVICE_URL;
    next();
});

var routes = require('./routes');
routes(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port);