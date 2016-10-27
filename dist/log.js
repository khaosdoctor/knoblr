'use strict';

var moment = require('moment');
var chalk = require('chalk');

var datetime_format = 'YYYY-MM-DD HH:mm:ss';
var log_types = {
  "warn": chalk.yellow,
  "error": chalk.red,
  "info": chalk.cyan
};
var display_logtype = true;
var display_timestamp = true;
var now = chalk.italic('[' + moment().format(datetime_format) + '] =>');

module.exports = {
  displayTimestamp: function displayTimestamp(v) {
    display_timestamp = v;
  },
  displayLogType: function displayLogType(v) {
    display_logtype = v;
  },
  "colors": chalk,
  reset: function reset() {
    display_logtype = true;
    display_timestamp = true;
    datetime_format = 'YYYY-MM-DD HH:mm:ss';
    now = chalk.italic('[' + moment().format(datetime_format) + '] =>');
    log_types = {
      "warn": chalk.yellow,
      "error": chalk.red,
      "info": chalk.cyan
    };
  },
  setLogColor: function setLogColor(type, color) {
    log_types[type] = color;
  },
  setTimeFormat: function setTimeFormat(f) {
    datetime_format = f;
    now = chalk.italic('[' + moment().format(datetime_format) + '] =>');
  },
  info: function info(t) {
    return console.info(display_timestamp ? now : "", display_logtype ? log_types.info.bold('{INFO}:') : "", log_types.info(t));
  },
  warn: function warn(t) {
    return console.warn(display_timestamp ? now : "", display_logtype ? log_types.warn.bold('{WARN}:') : "", log_types.warn(t));
  },
  error: function error(t) {
    return console.error(display_timestamp ? now : "", display_logtype ? log_types.error.bold('{ERROR}:') : "", log_types.error(t));
  }
};