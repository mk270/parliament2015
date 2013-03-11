#!/usr/bin/node
module.exports =  function() {

var http = require('http');
var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('node/test.db');


this.lookupEvents = function(callback) {
    db.serialize(function() {
        db.all("SELECT * from event", callback);
    });
};
this.addEvent = function(event) {
    db.serialize(function() {
            db.run("INSERT INTO event(start_date, end_date, headline, event_body, media, media_credit) VALUES ($start_date, $end_date, $headline, $event_body, $media, $media_credit)", event)
    })
    console.log("added")
}

}





