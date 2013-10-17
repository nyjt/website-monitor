var test = require('../index').test
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

function success_status_test() {
  var url = 'http://localhost:40444/';
  test(url, function(status_result) {
    assert.ok(status_result.success, 'success property should be true');
    assert.equal(status_result.error, false, 'error property should be false');
    assert.equal(status_result.message, 'SUCCESS', 'status message should be "SUCCESS"');
    assert.equal(status_result.url, url, "url property should be " + url + ", but it is " + status_result.url);
    assert.equal(status_result.code, 200, 'http status code should be 200');
    exec('node tests/success_log_test.js', function(error, stdout, stderr) {
      assert.equal(stdout, "SUCCESS 200 http://localhost:40444/\n");
      exec('node tests/success_log_more_url_test.js', function(error2, stdout2, stderr2) {
        assert.equal(stdout2, "SUCCESS 200 http://localhost:40444/\nSUCCESS 200 http://localhost:40444/\n");
        success_server.close();
      });
    });
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
    exec('node tests/error_log_test.js', function(error, stdout, stderr) {
      assert.equal(stdout, "ERROR   400 http://localhost:50555/\n");
      exec('node tests/error_log_more_url_test.js', function(error2, stdout2, stderr2) {
        assert.equal(stdout2, "ERROR   400 http://localhost:50555/\nERROR   400 http://localhost:50555/\n");
        error_server.close();
      });
    });
  });
}

success_server.listen(40444, success_status_test);
error_server.listen(50555, error_status_test);

