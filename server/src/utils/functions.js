/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
/**
 * Wait for n milliseconds (to honor request limits)
 * @param {*} timeMS Time to wait in milliseconds
 * @returns promise when wait is done
 */
const wait = (timeMS) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeMS)
  })
}

module.exports = {
  generateRandomString,
  wait
}