var request = require('request');

function status_test(url, callback) {
  request(url, function(error, response, body) {
    var message = 'SUCCESS';
    var code = 0;

    if (error || response.statusCode >= 400) {
      message = 'ERROR';
    }

    if (response) {
      code = response.statusCode;
    }

    callback({
      "success": (message == 'SUCCESS'),
      "error": (message == 'ERROR'),
      "message": message,
      "error_message": error,
      "url": url,
      "code": code
    });
  });
};

function call_callback(http_status, callback) {
  if (callback) {
    callback(http_status);
  }
};

exports.call_callback = call_callback;
function test(urls, callback) {
  var status_set = new Array();

  if (typeof urls == 'string') {
    urls = [urls]
  }

  var urls_count = urls.length;
  for(var i = 0; i < urls_count; i++) {
    status_test(urls[i], function(http_status) {
      call_callback(http_status, callback);
    });
  }
};

function text_output(http_status, callback) {
  if (http_status.error_message) {
    console.error(http_status.url + ' request error: ' + http_status.error_message);
  }
  var final_message = http_status.message;
  if (http_status.message == 'ERROR') {
    final_message += '  ';
  }
  console.log(final_message + ' ' + http_status.code + ' ' + http_status.url);
  call_callback(http_status, callback);
};

exports.test = test
exports.log = function(url, callback) {
  test(url, function(http_status) { text_output(http_status, callback); });
};

