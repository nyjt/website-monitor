var request = require('request');

function status_test(url, callback) {
  request(url, function(error, response) {
    var message = 'SUCCESS';
    var code = 0;
    var url_without_passwd = url.replace(/(https?:\/\/)(.*:.*@)?(.*)/, '$1$3');

    if (error || response.statusCode >= 400) {
      message = 'ERROR';
    }

    if (response) {
      code = response.statusCode;
    }

    callback({
      "success": (message === 'SUCCESS'),
      "error": (message === 'ERROR'),
      "message": message,
      "error_message": error,
      "url": url_without_passwd,
      "code": code
    });
  });
}

function call_callback(http_status, callback) {
  if (callback) {
    callback(http_status);
  }
}

exports.call_callback = call_callback;
function test(urls, callback) {
  if (typeof urls === 'string') {
    urls = [urls];
  }

  var urls_count = urls.length;
  function forward_callback(http_status) {
    call_callback(http_status, callback);
  }
  for(var i = 0; i < urls_count; i++) {
    status_test(urls[i], forward_callback);
  }
}

function text_output(http_status, callback) {
  if (http_status.error_message) {
    console.error(http_status.url + ' request error: ' + http_status.error_message);
  }
  var final_message = http_status.message;
  if (http_status.message === 'ERROR') {
    final_message += '  ';
  }
  console.log(final_message + ' ' + http_status.code + ' ' + http_status.url);
  call_callback(http_status, callback);
}

exports.test = test;
exports.log = function(url, callback) {
  test(url, function(http_status) { text_output(http_status, callback); });
};

