const moment = require('moment');
const chalk = require('chalk');
let now = chalk.italic('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] =>');

module.exports = {
  info: (t) => { return console.info(now, chalk.cyan.bold('{INFO}: ') + chalk.cyan(t)); },
  warn: (t) => { return console.warn(now, chalk.yellow.bold('{WARN}: ') + chalk.yellow(t)); },
  error: (t) => { return console.error(now, chalk.red.bold('{ERROR}: ') + chalk.red(t)); },
}