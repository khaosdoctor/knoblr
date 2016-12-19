const moment = require('moment');
const chalk = require('chalk');

let datetime_format = 'YYYY-MM-DD HH:mm:ss';
let log_types = {
  "warn": chalk.yellow,
  "error": chalk.red,
  "info": chalk.cyan
};

let display_logtype = true;
let display_timestamp = true;
let now = chalk.italic('[' + moment().format(datetime_format) + '] => ');

module.exports = {
  displayTimestamp: (v) => { display_timestamp = v; },
  displayLogType: (v) => { display_logtype = v; },
  "colors": chalk,
  reset: () => {
    display_logtype = true;
    display_timestamp = true;
    datetime_format = 'YYYY-MM-DD HH:mm:ss';
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
    log_types = {
      "warn": chalk.yellow,
      "error": chalk.red,
      "info": chalk.cyan
    };
  },
  setLogColor: (type, color) => {
    log_types[type] = color;
  },
  setTimeFormat: (f) => {
    datetime_format = f;
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
  },
  info: (t) => { 
    return console.info(
      ((display_timestamp) ? now : "") +
      ((display_logtype) ? log_types.info.bold('{INFO}: ') : "") +
      log_types.info(t)
    ); 
  },
  warn: (t) => { 
    return console.warn(
      ((display_timestamp) ? now : "") +
      ((display_logtype) ? log_types.warn.bold('{WARN}: ') : "") +
      log_types.warn(t)
    ); 
  },
  error: (t) => { 
    return console.error(
      ((display_timestamp) ? now : "") +
      ((display_logtype) ? log_types.error.bold('{ERROR}: ') : "") +
      log_types.error(t)
    ); 
  },
}