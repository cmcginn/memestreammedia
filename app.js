/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , lessMiddleware = require('less-middleware')
    , admin = require('./routes/admin')
    , dash = require('./routes/dash');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(lessMiddleware({ src:__dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function () {

    app.use(express.errorHandler());
});

app.get('/', admin.admin);
app.get('/users', user.list);
app.get('/dash', dash.dash);
app.post('/dash', dash.dashPost);
app.post('/dashtoken', dash.dashToken);
app.post('authorization', dash.authorization);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
