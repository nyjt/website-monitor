var monitor = require('../html');

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://flickr.com',
  'http://resize-links.com',
  'http://will-cause-error-with-0-status-code.com'
];

monitor.html(urls);

