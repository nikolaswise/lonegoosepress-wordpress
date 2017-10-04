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
var Debounce = require('./helpers/debounce.js');
var Throttle = require('./helpers/throttle.js');

// Browsernizr
// Modernizr wrapper for use with browserify
// https://www.npmjs.com/package/browsernizr
// Call any required test below
require('browsernizr/test/css/flexbox');
require('browsernizr/test/svg');
require('browsernizr/test/history');

// Require Browsernizr
var Modernizr = require('browsernizr');

// Browsernizr usage
// console.log(Modernizr.flexbox);

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

/*
  jQuery document ready

  All global onload scripts should be added to onload.js
  If page level script add to js/pages/PAGENAME.js
  See pages/home.js example and call within events/onload.js
*/
$(function() {

  app.onload();
  app.yo();
});
