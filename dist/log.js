'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var moment = require('moment');
var chalk = require('chalk');

var datetime_format = 'YYYY-MM-DD HH:mm:ss';
var log_types = {
  'warn': chalk.yellow,
  'error': chalk.red,
  'info': chalk.cyan
};
var now = chalk.italic('[' + moment().format(datetime_format) + '] => ');

// Creates final message
function assembleMessage(type, text, asString, displayTimestamp, displayLogType) {
  asString = typeof asString === 'boolean' ? asString : false;
  text = (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object' ? JSON.stringify(text, null, 2) : text;

  var message = (displayTimestamp ? now : '') + (displayLogType ? log_types[type].bold('{' + type.toUpperCase() + '}: ') : '') + log_types[type](text);

  return message;
}

var knoblr = {
  // Properties
  displayTimestamp: true, // Sets Timestamp Flag
  displayLogType: true, // Sets flag to display log type
  colors: chalk, // Return an instance of Chalk to select colors
  currentLogColor: log_types, // Returns the current log colors

  // Reset all the properties to the default values
  reset: function reset() {
    knoblr.displayLogType = true;
    knoblr.displayTimestamp = true;
    datetime_format = 'YYYY-MM-DD HH:mm:ss';
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
    log_types = {
      'warn': chalk.yellow,
      'error': chalk.red,
      'info': chalk.cyan
    };
  },

  // Sets the text color
  setLogColor: function setLogColor(type, color) {
    log_types[type] = color;
  },

  // Sets the time format
  setTimeFormat: function setTimeFormat(f) {
    datetime_format = f;
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
  },

  // Main Functions
  info: function info(t, asString) {
    var message = assembleMessage('info', t, asString, knoblr.displayTimestamp, knoblr.displayLogType);

    // Checks if the user wants to return a variable instead
    return !asString ? console.info(message) : message;
  },
  warn: function warn(t, asString) {
    var message = assembleMessage('warn', t, asString, knoblr.displayTimestamp, knoblr.displayLogType);

    // Checks if the user wants to return a variable instead
    return !asString ? console.warn(message) : message;
  },
  error: function error(t, asString) {
    var message = assembleMessage('error', t, asString, knoblr.displayTimestamp, knoblr.displayLogType);
    // Checks if the user wants to return a variable instead
    return !asString ? console.error(message) : message;
  }

};

module.exports = knoblr;