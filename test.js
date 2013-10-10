var test = require('./index').test
var http = require('http');
var assert = require('assert');

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

function success_status_test() {
  var url = 'http://localhost:40444/';
  test(url, function(status_result) {
    assert.ok(status_result.success, 'success property should be true');
    assert.equal(status_result.error, false, 'error property should be false');
    assert.equal(status_result.message, 'SUCCESS', 'status message should be "SUCCESS"');
    assert.equal(status_result.url, url, "url property should be " + url + ", but it is " + status_result.url);
    assert.equal(status_result.code, 200, 'http status code should be 200');
    success_server.close();   
  });
}

function error_status_test() {
  var url = 'http://localhost:50555/';
  var status_result = test(url, function(status_result) {
    assert.equal(status_result.success, false, 'success property should be false');
    assert.ok(status_result.error, 'error property should be true');
    assert.equal(status_result.message, 'ERROR', 'status message should be "ERROR"');
    assert.equal(status_result.url, url, "url property should be " + url + ", but it is " + status_result.url);
    assert.equal(status_result.code, 400, 'http status code should be 400');
    error_server.close();
  });
}

success_server.listen(40444, success_status_test);
error_server.listen(50555, error_status_test);

