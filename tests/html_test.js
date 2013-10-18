var http = require('http');
var assert = require('assert');
var exec = require('child_process').exec;

var success_server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.write('<html><head><title>OK</title></head><body>OK</body></html>');
  res.end();
});

var error_server = http.createServer(function(req, res) {
  res.writeHead(400, { 'Content-type': 'text/html' });
  res.write('<html><head><title>ERROR</title></head><body>ERROR</body></html>');
  res.end();
});

var test_counter = 0;

function test_with_array() {
  exec('node tests/html_output_test.js', function(error, stdout, stderr) {
    assert.ok(stdout.match(/<tr><td><a href="http:\/\/localhost:44444\/">http:\/\/localhost:44444\/<\/a><\/td><td>200<\/td><td><span class="label label-success">SUCCESS<\/span><\/td><\/tr>/), 'We did not get expected output: ' + stdout);
    assert.ok(stdout.match(/<tr><td><a href="http:\/\/localhost:55555\/">http:\/\/localhost:55555\/<\/a><\/td><td>400<\/td><td><span class="label label-danger">ERROR<\/span><\/td><\/tr>/), 'We did not get expected output: ' + stdout)
    success_server.close();
    error_server.close();
  });
}

success_server.listen(44444, function() { error_server.listen(55555, test_with_array); });

