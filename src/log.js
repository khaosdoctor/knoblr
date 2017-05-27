const moment = require('moment')
const chalk = require('chalk')

let datetime_format = 'YYYY-MM-DD HH:mm:ss'
let log_types = {
  'warn': chalk.yellow,
  'error': chalk.red,
  'info': chalk.cyan
}
let now = chalk.italic(`[${moment().format(datetime_format)}] => `)

// Creates final message
function assembleMessage (type, text, asString, displayTimestamp, displayLogType) {
  asString = (typeof asString === 'boolean') ? asString : false
  text = (typeof text === 'object') ? JSON.stringify(text, null, 2) : text

  let message = ((displayTimestamp) ? now : '') +
      ((displayLogType) ? log_types[type].bold(`{${type.toUpperCase()}}: `) : '') +
    log_types[type](text)

  return message
}

const knoblr = {
  // Properties
  displayTimestamp: true, // Sets Timestamp Flag
  displayLogType: true, // Sets flag to display log type
  colors: chalk, // Return an instance of Chalk to select colors
  currentLogColor: log_types, // Returns the current log colors

  // Reset all the properties to the default values
  reset: () => {
    knoblr.displayLogType = true
    knoblr.displayTimestamp = true
    datetime_format = 'YYYY-MM-DD HH:mm:ss'
    now = chalk.italic(`[${moment().format(datetime_format)}] => `)
    log_types = {
      'warn': chalk.yellow,
      'error': chalk.red,
      'info': chalk.cyan
    }
  },

  // Sets the text color
  setLogColor: (type, color) => {
    log_types[type] = color
  },

  // Sets the time format
  setTimeFormat: (f) => {
    datetime_format = f
    now = chalk.italic(`[${moment().format(datetime_format)}] => `)
  },

  // Main Functions
  info: (t, asString) => {
    let message = assembleMessage('info', t, asString, knoblr.displayTimestamp, knoblr.displayLogType)

    // Checks if the user wants to return a variable instead
    return (!asString) ? console.info(message) : message
  },
  warn: (t, asString) => {
    let message = assembleMessage('warn', t, asString, knoblr.displayTimestamp, knoblr.displayLogType)

    // Checks if the user wants to return a variable instead
    return (!asString) ? console.warn(message) : message
  },
  error: (t, asString) => {
    let message = assembleMessage('error', t, asString, knoblr.displayTimestamp, knoblr.displayLogType)
    // Checks if the user wants to return a variable instead
    return (!asString) ? console.error(message) : message
  }

}

module.exports = knoblr
