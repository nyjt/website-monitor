Website Monitor
===============

Lightweight Node.js command line tool for website monitoring.


[![Build Status](https://travis-ci.org/nyjt/website-monitor.png)](https://travis-ci.org/nyjt/website-monitor)

[![Code Climate](https://codeclimate.com/github/nyjt/website-monitor.png)](https://codeclimate.com/github/nyjt/website-monitor)

## How to install it

```bash
npm install website-monitor
```

## How to use it


### Plain text output

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
  'http://resize-links.com',
  'http://www.google.com/not-found'
];

monitor.log(urls);
```

This will produce this output:

```
SUCCESS 200 http://resize-links.com
SUCCESS 200 http://google.com
SUCCESS 200 http://yahoo.com
SUCCESS 200 http://flickr.com
ERROR   404 http://www.google.com/not-found
```

Check the ./examples/ directory for more example.

The typical usage of log method when you call it from a bash script and grep for ERROR word,
after it you can do some more action ex. start the webserver if stoped or send email alert.

### HTML output

From the 1.2.0 version website monitor can produce html output.
The typical use case of this feature is the redirection the HTML output in .html file using cronjob as often as you want.
NginX or any other webserver can server this static file very fast.
This is pretty good reporting tool and you don't need to query any database to check the actual status of websites.

So it is pretty easy to use.

Let be the content of website_status_html_generator.js is this:

```
var monitor = require('website-monitor');

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://flickr.com',
  'http://resize-links.com'
];

monitor.log(urls);
```

You can use this file from command line or crontab.

from command line:
```
node website_status_html_generator.js
```

Or you can run it from crontab every 5 minutes and it regenerates the status HTML file:

```
*/5 * * * * node /home/myuser/website-monitor-scripts/website_status_html_generator.js >/var/www/status.example.com/index.html
```

Of course you need to change the path.

