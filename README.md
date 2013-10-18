Website Monitor
===============

Lightweight Node.js command line tool for website monitoring.


[![Build Status](https://travis-ci.org/nyjt/website-monitor.png)](https://travis-ci.org/nyjt/website-monitor)

### How to install it

```bash
npm install website-monitor
```

### How to use it

Use log method to check http status of websites.

You can pass one URL as string:
```js
var monitor = require('website-monitor');

monitor.log('http://google.com');
```

Or more as array:

```js
var monitor = require('website-monitor');

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://flickr.com',
  'http://resize-links.com'
];

monitor.log(urls);
```

Check the ./examples/ directory for more example.


