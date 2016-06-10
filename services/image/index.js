require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'stage-0']
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

exports = module.exports = require('./app');