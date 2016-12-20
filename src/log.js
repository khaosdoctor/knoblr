const moment = require('moment');
const chalk = require('chalk');

let datetime_format = 'YYYY-MM-DD HH:mm:ss';
let log_types = {
  "warn": chalk.yellow,
  "error": chalk.red,
  "info": chalk.cyan
};
let now = chalk.italic('[' + moment().format(datetime_format) + '] => ');

const knoblr = {
  //Properties
  displayTimestamp: true, //Sets Timestamp Flag
  displayLogType: true, //Sets flag to display log type
  colors: chalk, //Return an instance of Chalk to select colors
  currentLogColor: log_types, //Returns the current log colors

  //Reset all the properties to the default values
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

  //Sets the text color
  setLogColor: (type, color) => {
    log_types[type] = color;
  },

  //Sets the time format
  setTimeFormat: (f) => {
    datetime_format = f;
    now = chalk.italic('[' + moment().format(datetime_format) + '] => ');
  },

  //Main Functions
  info: (t, asString) => {
    asString = (typeof asString !== undefined) ? asString : false;
    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.info.bold('{INFO}: ') : "") +
      log_types.info(t);
    
    //Checks if the user wants to return a variable instead
    if (!asString) {
      return console.info(message);
    } else {
      return message;
    }

  },
  warn: (t, asString) => {
    asString = (typeof asString !== undefined) ? asString : false;
    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.warn.bold('{WARN}: ') : "") +
      log_types.warn(t);
    
    //Checks if the user wants to return a variable instead
    if (!asString) {
      return console.warn(message);
    } else {
      return message;
    }

  },
  error: (t, asString) => {
    asString = (typeof asString !== undefined) ? asString : false;
    let message = ((knoblr.displayTimestamp) ? now : "") +
      ((knoblr.displayLogType) ? log_types.error.bold('{ERROR}: ') : "") +
      log_types.error(t);
    
    //Checks if the user wants to return a variable instead
    if (!asString) {
      return console.error(message);
    } else {
      return message;
    }

  }

};

module.exports = knoblr;