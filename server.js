//Module dependencies
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api')
    dbpgCode = require('./dbpg')
    dbpg = new dbpgCode()


var app = express()
RedisStore = require('connect-redis')(express)
url = require('url')

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


//Redis
redis = require('redis')
options = {parser: 'javascript'}
//Routes
app.get('/', routes.index)

app.get('/events', function(req, res) {

    //Get events from database
    dbpg.lookupEvents(function(result) {
        var timelineJSON = {
            timeline: {
                headline: "Parliament 2015",
                type: "default",
                text: "<p>The history of Parliament since Magna Carta</p>",
                asset: {
                    media: "http://www.bestourism.com/img/items/big/764/Houses-of-Parliament_Houses-of-Parliament-view_3027.jpg",
                    credit: "Developed at Rewired State Parliament Hackathon",
                    caption: ""
                },
                date: result.rows
            }
        }

        res.send(timelineJSON)
    })
})

//Api
//Get body content of POST request for new event
app.post('/newevent', function(req, res) {
    var data = req.body
    var event = [
        data.start_date,
        data.end_date,
        data.headline,
        data.event_body,
        data.media,
        data.credit

    ]
    console.log(event)
    dbpg.addEvent(event)
})


//Start Server
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('Server.js listening on '+port)
})