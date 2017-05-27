const log = require('../dist/log.js')

const display = function () {
  const obj = {
    message: 'This is a random message'
  }
  log.info('Displaying info text')
  log.warn('Displaying warn text')
  log.error('Displaying error text')

  log.info(obj)
  log.warn(obj)
  log.error(obj)
}

console.log('======== Changing colors ========')
log.reset()
log.setLogColor('info', log.colors.green)
log.setLogColor('warn', log.colors.cyan)
log.setLogColor('error', log.colors.bgYellow)
display()

log.reset()
console.log('======== Setting time formats ========')
log.setTimeFormat('DD/MM/YYYY hh:mm a')
display()

console.log('======== Setting no time ========')
log.reset()
log.displayTimestamp = false
display()

console.log('======== Setting no type ========')
log.reset()
log.displayLogType = false
display()
