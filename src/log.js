const moment = require('moment');
const chalk = require('chalk');

let datetime_format = 'YYYY-MM-DD HH:mm:ss';
let log_types = {
  "warn": chalk.yellow,
  "error": chalk.red,
  "info": chalk.cyan
};
let now = chalk.italic('[' + moment().format(datetime_format) + '] => ');

module.exports = {
  "colors": chalk,
  displayTimestamp: true, //Sets Timestamp Flag
  displayLogType: true, //Sets flag to display log type
  reset: () => {
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
  setLogColor: (type, color) => {
    log_types[type] = color;
  },
  setTimeFormat: (f) => {
    datetime_format = f;
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
  },
  info: (t) => { 
    return console.info(
      log_types.info(t)
    ); 
  },
  warn: (t) => { 
    return console.warn(
      ((display_timestamp) ? now : "") +
      ((display_logtype) ? log_types.warn.bold('{WARN}: ') : "") +
      log_types.warn(t)
    ); 
    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.info.bold('{INFO}: ') : "") +
  },
  error: (t) => { 
    return console.error(
      log_types.error(t)
    ); 
    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.warn.bold('{WARN}: ') : "") +
  },
}    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.error.bold('{ERROR}: ') : "") +