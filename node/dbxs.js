#!/usr/bin/node

var http = require('http');
var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('test.db');

function json_of_sql_rows() {
  var rows = new Array();
  var handle_row = function(err, row) {
	rows.push(row);
  };
  db.serialize(function() {
	db.each("SELECT * from event", handle_row);
  });
  return JSON.stringify(rows);
};

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});

  var json_payload = json_of_sql_rows();
  response.write(json_payload);
  response.end();
}).listen(8080);
