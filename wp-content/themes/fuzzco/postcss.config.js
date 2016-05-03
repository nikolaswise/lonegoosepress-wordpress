var postcss = require('postcss');
var reporter = require('postcss-reporter');

var cssprefixes = [
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
  // NOT the Edge app version shown in Edge's "About" screen.
  // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
  // See also https://github.com/Fyrd/caniuse/issues/1928
  'Edge >= 12',
  'Explorer >= 11',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

module.exports = {
  use: [
    'postcss-import',
    'autoprefixer',
    'postcss-reporter',
    'css-mqpacker',
    'cssnano'
  ],
  'autoprefixer': {
    'browsers': cssprefixes
  },
  'postcss-import': {
    transform(css) {
      return postcss([reporter]).process(css).css;
    }
  },
  'postcss-reporter': {
    clearMessages: true
  },
  output: 'style.min.css'
};
