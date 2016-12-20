'use strict';

var moment = require('moment');
var chalk = require('chalk');

var datetime_format = 'YYYY-MM-DD HH:mm:ss';
var log_types = {
  "warn": chalk.yellow,
  "error": chalk.red,
  "info": chalk.cyan
};

var now = chalk.italic('[' + moment().format(datetime_format) + '] => ');

module.exports = {
  "colors": chalk,
  displayTimestamp: true, //Sets Timestamp Flag
  displayLogType: true, //Sets flag to display log type
  reset: function reset() {
    knoblr.displayLogType = true;
    knoblr.displayTimestamp = true;
    datetime_format = 'YYYY-MM-DD HH:mm:ss';
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
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
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
  },
  info: function info(t) {
    var message = (knoblr.displayTimestamp ? now : "") + (knoblr.displayLogType ? log_types.info.bold('{INFO}: ') : "") + log_types.info(t);
  },
  warn: function warn(t) {
    return console.warn((display_timestamp ? now : "") + (display_logtype ? log_types.warn.bold('{WARN}: ') : "") + log_types.warn(t));
    var message = (knoblr.displayTimestamp ? now : "") + (knoblr.displayLogType ? log_types.warn.bold('{WARN}: ') : "") + log_types.warn(t);
  },
  error: function error(t) {
    return console.error((display_timestamp ? now : "") + (display_logtype ? log_types.error.bold('{ERROR}: ') : "") + log_types.error(t));
    var message = (knoblr.displayTimestamp ? now : "") + (knoblr.displayLogType ? log_types.error.bold('{ERROR}: ') : "") + log_types.error(t);
  }
};