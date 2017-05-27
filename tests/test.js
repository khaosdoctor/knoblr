import test from 'ava'
const knoblr = require('../src/log.js')
const moment = require('moment')
const chalk = require('chalk')

let testString = 'FooBar'
let timeFormat = 'DD/MM/YYYY hh:mm a'

test('Changing colors', t => {
  knoblr.reset()
  knoblr.setLogColor('info', knoblr.colors.green)
  knoblr.setLogColor('warn', knoblr.colors.cyan)
  knoblr.setLogColor('error', knoblr.colors.bgYellow)
  knoblr.displayLogType = false
  knoblr.displayTimestamp = false

  t.is(knoblr.currentLogColor.error(testString), '\u001b[31mFooBar\u001b[39m', 'Colors match the preset?')
  t.is(knoblr.currentLogColor.warn(testString), '\u001b[33mFooBar\u001b[39m', 'Colors match the preset?')
  t.is(knoblr.currentLogColor.info(testString), '\u001b[36mFooBar\u001b[39m', 'Colors match the preset?')
})

test('Testing output', t => {
  knoblr.reset()
  t.is(knoblr.error(testString), console.error(testString))
  t.is(knoblr.warn(testString), console.warn(testString))
  t.is(knoblr.info(testString), console.info(testString))
})

test('Changing date format', t => {
  knoblr.reset()
  knoblr.setTimeFormat(timeFormat)
  let log = {
    error: knoblr.error(testString, true),
    warn: knoblr.warn(testString, true),
    info: knoblr.info(testString, true)
  }

  let now = knoblr.colors.italic('[' + moment().format(timeFormat) + ']')
  let assertion = log.error.split(' => ')[0] + '\u001b[23m'

  t.is(assertion, now, 'Datetime formats match?')
})

test('Removing log type', t => {
  knoblr.reset()
  knoblr.displayLogType = false
  let log = {
    error: knoblr.error(testString, true),
    warn: knoblr.warn(testString, true),
    info: knoblr.info(testString, true)
  }

  t.deepEqual(log.error.indexOf('{ERROR}'), -1, 'ERROR type is being displayed?')
  t.deepEqual(log.warn.indexOf('{WARN}'), -1, 'WARN type is being displayed?')
  t.deepEqual(log.info.indexOf('{INFO}'), -1, 'INFO type is being displayed?')
})

test('Removing timestamp', t => {
  knoblr.reset()
  knoblr.displayTimestamp = false
  let log = {
    error: knoblr.error(testString, true),
    warn: knoblr.warn(testString, true),
    info: knoblr.info(testString, true)
  }

  t.deepEqual(log.error.indexOf('[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']'), -1, 'Is the time displayed on error?')
  t.deepEqual(log.warn.indexOf('[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']'), -1, 'Is the time displayed on warns?')
  t.deepEqual(log.info.indexOf('[' + moment().format('YYYY-MM-DD HH:mm:ss') + ']'), -1, 'Is the time displayed on info?')
})

test('Resetting everything', t => {
  knoblr.displayLogType = false
  knoblr.displayTimestamp = false
  knoblr.setLogColor('info', chalk.green)
  knoblr.setLogColor('warn', knoblr.colors.cyan)
  knoblr.setLogColor('error', chalk.blue)

  t.plan(10)

  t.false(knoblr.displayLogType, 'Did we remove the type?')
  t.false(knoblr.displayTimestamp, 'Did we remove the time?')
  t.is(knoblr.warn(testString, true), knoblr.colors.cyan(testString), 'Did the warn colors have been set?')
  t.is(knoblr.error(testString, true), chalk.blue(testString), 'Did the error colors have been set?')
  t.is(knoblr.info(testString, true), chalk.green(testString), 'Did the info colors have been set?')

  knoblr.reset()

  t.true(knoblr.displayLogType, 'Did it reset the type?')
  t.true(knoblr.displayTimestamp, 'Did it reset the time?')
  t.not(knoblr.warn(testString, true), knoblr.colors.cyan(testString), 'Did the warn colors have been reset?')
  t.not(knoblr.error(testString, true), chalk.blue(testString), 'Did the error colors have been reset?')
  t.not(knoblr.info(testString, true), chalk.green(testString), 'Did the info colors have been reset?')
})

test('String test', (t) => {
  knoblr.displayLogType = false
  knoblr.displayTimestamp = false
  t.plan(3)
  t.is(knoblr.info(testString, true), '\u001b[36mFooBar\u001b[39m', 'Is it printing the correct info string?')
  t.is(knoblr.warn(testString, true), '\u001b[33mFooBar\u001b[39m', 'Is it printing the correct warn string?')
  t.is(knoblr.error(testString, true), '\u001b[31mFooBar\u001b[39m', 'Is it printing the correct error string?')
})

test('Display Object', (t) => {
  t.plan(6)

  let obj = {
    anAttribute: 'a value',
    anotherAttribute: 12
  }

  t.regex(knoblr.info(obj, true), /anAttribute/)
  t.regex(knoblr.info(obj, true), /anotherAttribute/)
  t.regex(knoblr.error(obj, true), /anAttribute/)
  t.regex(knoblr.error(obj, true), /anotherAttribute/)
  t.regex(knoblr.warn(obj, true), /anAttribute/)
  t.regex(knoblr.warn(obj, true), /anotherAttribute/)
})
