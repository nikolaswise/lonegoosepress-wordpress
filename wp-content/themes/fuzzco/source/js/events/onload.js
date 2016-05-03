var $ = require('jquery');
var test = require('../pages/home.js');

module.exports = function () {
  var button = $('<button/>').attr('class','button').html('click me').on('click', function() {
    alert('yo dog!');

    // Called from global app
    app.yo();
  });

  $('.for-button').append(button);

  // Call from home.js
  test.something();
}
