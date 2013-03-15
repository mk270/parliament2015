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

})
//In development
app.configure('development', function() {})
//In production
app.configure('production', function() {})


//Redis
redis = require('redis')
options = {parser: 'javascript'}
redisClient = redis.createClient(10158, "cod.redistogo.com", options)
redisClient.auth('087e5607d431e31f4cc4545e65b298c4')

//Back sessions with Redis
app.use(express.session({secret:"password", store: new RedisStore({client: redisClient})}))
app.use(express.logger())
app.use(app.router)
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




OAuth = require('oauth').OAuth
oauth = new OAuth ("https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "nPfjyuKSswDFhiFiTlXVsg",
    "fu9RYm4ATwxckjN9Bq5a9W4YjZQbiv8CdpZmmxUE",
    "1.0",
    "http://localhost:3000",
    "HMAC-SHA1"
)

//Sign in with Twitter
app.get('/auth/twitter', function(req, res) {

    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) {
            console.log(error);
            res.send("Authentication Failed!");
        }
        else {
            req.session.oauth = {
                token: oauth_token,
                token_secret: oauth_token_secret
            };
            console.log(req.session.oauth);
            res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
        }
    });

});

app.get('/auth/twitter/callback', function(req, res, next) {

    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth_data = req.session.oauth;

        oauth.getOAuthAccessToken(
            oauth_data.token,
            oauth_data.token_secret,
            oauth_data.verifier,
            function(error, oauth_access_token, oauth_access_token_secret, results) {

                if (error) {
                    console.log(error);
                    res.send("Authentication Failure!");
                }
                else {
                    req.session.oauth.access_token = oauth_access_token;
                    req.session.oauth.access_token_secret = oauth_access_token_secret;
                    req.session.username = results.screen_name;
                    // console.log(results, req.session.oauth);

                    // Save in DB
                    redis.get('user:username:'+results.screen_name+':id', function(err, reply) {

                        if (!reply) {
                            // User doesn't exists - Add New User
                            redis.incr('user_id');
                            redis.get('user_id', function(err, reply) {
                                if (err || !reply) {
                                    console.log(err, reply);
                                    return;
                                }

                                var id = parseInt(reply);
                                redis.sadd('user:id', id);
                                redis.hset('user:'+id, 'username', results.screen_name);
                                redis.hset('user:'+id, 'service_user_id', results.user_id);
                                // username index
                                redis.set('user:username:'+results.screen_name+':id', id);

                                // Set global vars for templates
                                app.locals.username = results.screen_name;
                                console.log(app.locals.username)
                                res.redirect('/');
                            });
                        }
                        else {
                            // User exists
                            app.locals.username = results.screen_name;
                            res.redirect('/');
                        }

                    });

                }

                return;
            }
        );
    }
    else {
        res.redirect('/login'); // Redirect to login page
    }

});

app.get('/auth/twitter/user', function(req, res) {
//Send the user info
oauth.get('https://api.twitter.com/1.1/users/show.json?screen_name='+req.session.username, req.session.oauth.access_token, req.session.oauth.access_token_secret, function(error, data, response) {
    if (data) {
        req.session.data = JSON.parse(data)
        user = {screen_name: req.session.data.screen_name, profile_pic: req.session.data.profile_image_url}
        res.send(user)
    }
})
})

//Start Server
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('Server.js listening on '+port)
})