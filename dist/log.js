'use strict';

var moment = require('moment');
var chalk = require('chalk');
var now = chalk.italic('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] =>');

module.exports = {
  info: function info(t) {
    return console.info(now, chalk.cyan.bold('{INFO}: ') + chalk.cyan(t));
  },
  warn: function warn(t) {
    return console.warn(now, chalk.yellow.bold('{WARN}: ') + chalk.yellow(t));
  },
  error: function error(t) {
    return console.error(now, chalk.red.bold('{ERROR}: ') + chalk.red(t));
  }
};