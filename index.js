var request = require('request');

function status_test(url, callback) {
  request(url, function(error, response, body) {
    var message = 'SUCCESS';

    if (response.statusCode >= 400 || error) {
      message = 'ERROR';
    }

    callback({
      "success": (message == 'SUCCESS'),
      "error": (message == 'ERROR'),
      "message": message,
      "error_message": error,
      "url": url,
      "code": response.statusCode
    });
  });
}

exports.test = function(url, callback) {
  status_test(url, callback);
}

exports.log = function(url, callback) {
  status_test(url, function(options) {
    if (options.error_message) { 
      console.log(url + ' request error: ' + error);
    }
    var final_message = message;
    if (message == 'ERROR') {
      final_message += '  ';
    }
    console.log(final_message + ' ' + options.code + ' ' + url);
    callback(options);
  }); 
}
