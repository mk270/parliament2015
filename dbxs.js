#!/usr/bin/node

var http = require('http');

var pg = require('pg');
//var conString = process.env.DATABASE_URL || "parliament2015";
var conString = "parliament2015";
function json_of_sql_rows(cb) {
  var client = new pg.Client(conString);

  console.log("connecting");
  client.connect(function(err) {
	console.log("connected");
	client.query('SELECT * FROM event"', function(err, result) {
	  console.log("hello?");
      console.log(result.rows[0]);
	  cb(JSON.stringify(result.rows));
	});
	console.log("query submitted");
  });
}

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  console.log("recv");

  var cb = function(data) {
	console.log("resp");
	response.write(data);
	response.end();
  };

  json_of_sql_rows(cb);
}).listen(8080);
