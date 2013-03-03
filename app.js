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
    , frame = require('./routes/frame')
    , api = require('./routes/api')
    , fs = require('fs')
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
app.get('/',routes.index);
//app.get('/', admin.admin);
app.get('/frame', frame.frame)
app.get('/framesource', frame.framesource)
app.get('/users', user.list);
app.get('/dash', dash.dash);
app.post('/dash', dash.dashPost);
app.post('/api/posts/*', api.posts.save);
app.get('/api/posts/*', api.posts.get);
app.post('/dashtoken', dash.dashToken);
app.post('authorization', dash.authorization);
app.get('/graphs/*', function (req, res) {
    fs.readFile(__dirname + '/public/graphs/' + req.params[0], function (err, data) {
        if (err)
            res.send(500, {error:err});
        else {
            res.writeHead(200, {'Content-Type':'text/n3'})
            res.write(data);
            res.end();
        }
    });

})
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
