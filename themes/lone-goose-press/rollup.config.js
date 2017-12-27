import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  format: 'iife',
  entry: 'source/js/app.js',
  dest: 'js/bundle.js',
  moduleName: "lgp",
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble({
      exclude: ['node_modules/**', '*.json']
    })
  ]
}