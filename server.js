//Module dependencies
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api')
    dbxsCode = require('./dbxs')
    dbxs = new dbxsCode()


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

app.get('/events', function(req, res) {
    //Get events from database
    dbxs.lookupEvents(function(err, rows) {
        events = []
        //Change the format of the json object to match the timeline requirements
        rows.forEach(function(row) {
            event = {
                startDate: "2015,12,5",
                endDate: "2015,12,5",
                headline: row.headline,
                text: row.event_body,
                tag: row.tag,
                classname: '',
                asset: {
                    media: row.media,
                    thumbnail: '',
                    credit: row.media_credit,
                    caption: ''
                }
            }
            events.push(event)
        })
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
                date: events
            }
        }
        res.send(timelineJSON)
    });
})

//Api

//Redirects all others to index (HTML5 history)
app.get('*', routes.index)

//Start Server
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('Server.js listening on '+port)
})