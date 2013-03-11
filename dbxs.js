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

}





