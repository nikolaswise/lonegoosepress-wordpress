var $ = require('jquery');
var homepage = require('../pages/home.js');

module.exports = function () {
  var button = $('<button/>').attr('class','button').html('click me').on('click', function() {
    alert('yo dog!');

    // Called from global app
    app.yo();
  });

  $('.for-button').append(button);

  // On load call from home.js
  homepage.onload();
}
