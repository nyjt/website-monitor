var test = require('../index').test;
var html = require('../html').html;
var log = require('../index').log;
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

var test_counter = 0;

function test_with_array() {
  var url1 = 'http://localhost:44444/';
  var url2 = 'http://localhost:55555/';

  function close_server() {
    test_counter++;
    if (test_counter >= 6) {
      success_server.close();
      error_server.close();
    }

    console.log(test_counter + '. Array Test is running.');
  }

  function response_tester(status_result) {
    if (status_result.url == url1) {
      assert.ok(status_result.success, 'success property should be true, but now it is ' + status_result.success);
      assert.equal(status_result.error, false, 'error property should be false');
      assert.equal(status_result.message, 'SUCCESS', 'status message should be "SUCCESS"');
      assert.equal(status_result.url, url1, "url property should be " + url1 + ", but it is " + status_result.url);
      assert.equal(status_result.code, 200, 'http status code should be 200');
    } else {
      assert.equal(status_result.success, false, 'success property should be false');
      assert.ok(status_result.error, 'error property should be true');
      assert.equal(status_result.message, 'ERROR', 'status message should be "ERROR"');
      assert.equal(status_result.url, url2, "url property should be " + url2 + ", but it is " + status_result.url);
      assert.equal(status_result.code, 400, 'http status code should be 400');
    }
    close_server();
  }
  var url = [url1, url2];
  test(url, function(data) {
      console.log('Testing test method with arrays.');
      response_tester(data);
  });
  html(url, function(data) {
      console.log('Testing html method with arrays.');
      response_tester(data);
  });
  log(url, function(data) {
      console.log('Testing log method with arrays.');
      response_tester(data);
  });
}

success_server.listen(44444, function() { error_server.listen(55555, test_with_array); });

