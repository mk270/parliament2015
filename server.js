//Module dependencies
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api')
    dbxs = require('./dbxs')()
    dbxs


var app = express()

//Configuration
app.configure(function() {
    app.set('views', __dirname + "/views");
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(__dirname+'/public'))
    app.use(app.router)
})
//In development
app.configure('development', function() {})
//In production
app.configure('production', function() {})

//Routes
app.get('/', routes.index)

//Api

//Redirects all others to index (HTML5 history)
app.get('*', routes.index)

//Start Server
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('Ready to hack on port '+port)
})