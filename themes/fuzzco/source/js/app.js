import $ from 'jquery'
// var fastclick = require('fastclick');
import debounce from './helpers/debounce.js'
import throttle from './helpers/throttle.js'

// Browsernizr
// Modernizr wrapper for use with browserify
// https://www.npmjs.com/package/browsernizr
// Call any required test below
// require('browsernizr/test/css/flexbox');
// require('browsernizr/test/svg');
// require('browsernizr/test/history');

// Require Browsernizr
// var Modernizr = require('browsernizr');

// Browsernizr usage
// console.log(Modernizr.flexbox);

/*
  Define global scope
*/
var app = window.app || {};

app.yo = function() {
  console.log('yo');
  console.log(debounce)
  console.log(throttle)
}

// app.onload = onload;

// Replace/Create the global namespace
window.app = app;

/*
  jQuery document ready

  All global onload scripts should be added to onload.js
  If page level script add to js/pages/PAGENAME.js
  See pages/home.js example and call within events/onload.js
*/
$(function() {
  app.yo();
});