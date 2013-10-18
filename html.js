var monitor = require('./index');
var test = monitor.test
var call_callback = monitor.call_callback

exports.html_title = 'Website Monitor'
var html_header = '<html><head><title>Site</title>';
//html_header += '<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>';
html_header += '<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">';
html_header += '<body><h1>Status</h1><table class="table"><thead class="header"><th>URL</th><th>Code</th><th>Status</th></thead><tbody>';
exports.html_header = html_header;
exports.html_footer = "</tbody></body></html>";

exports.html = function(url, callback) {
  function html_output(http_status, callback) {
    var table_row = '<tr>';
    table_row += '<td><a href="' + http_status.url + '">' + http_status.url + '</a></td>';
    table_row += '<td>' + http_status.code + '</td>';
    table_row += '<td><span class="label label-' + ((http_status.error) ? 'danger' : 'success') + '">' + http_status.message + '</span></td>';
    table_row += '</tr>';
    buffered_log(table_row);
    monitor.call_callback(http_status, callback);
  };

  var log_buffer = [];
  function buffered_log() {
    log_buffer.push([].slice.call(arguments));
  };

  buffered_log(exports.html_header);
  test(url, function(http_status) { html_output(http_status, callback); })
  process.on('exit', function() {
    for(var j = 0; j < log_buffer.length; j++) {
      process.stdout.write(log_buffer[j] + "\n");
    }
    process.stdout.write(exports.html_footer + '\n');
  });
};

