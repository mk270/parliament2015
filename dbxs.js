#!/usr/bin/node
module.exports = dbxs =  function() {
var http = require('http');
var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('node/test.db');

http.createServer(function (request, response) {

  var lookupEvents = function(callback) {
	db.serialize(function() {
	  db.all("SELECT * from event", callback);
	});
  };

  var continueHttpStream = function(err, rows) {
	response.write(JSON.stringify(rows));
	response.end();
  };

  response.writeHead(200, {'Content-Type': 'text/plain'});
  lookupEvents(continueHttpStream);

}).listen(8080);
}