var postcss = require('postcss');
var reporter = require('postcss-reporter');

var cssprefixes = [
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
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
