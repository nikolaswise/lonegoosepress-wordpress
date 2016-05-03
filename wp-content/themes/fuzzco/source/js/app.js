/*
  Browserify

  Define node_modles
  var moduleName = require('moduleName');
  e.g. var jquery = require('jquery');

  Define local javascript
  var script = require('./script.js');

  More info:
  https://ponyfoo.com/articles/a-gentle-browserify-walkthrough
*/
var $ = require('jquery');
var fastclick = require('fastclick');
var onload = require('./events/onload.js');

/*
  Define global scope
*/
var app = window.app || {};

app.yo = function() {
  console.log('yo');
}

app.onload = onload;

// Replace/Create the global namespace
window.app = app;

// http://www.mattburkedev.com/export-a-global-to-the-window-object-with-browserify/
// look into http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds

/*
  jQuery document ready
*/
$(function() {
  app.onload();
  app.yo();
});

// look into http://gregfranko.com/jquery-best-practices/ and https://github.com/holidayextras/culture/blob/master/clientside-jquery-best-practices.md
