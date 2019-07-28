const path = require('path')

function isProd(env) {
  return env === 'production'
}

function hashMode(env) {
  return isProd(env) ? 'contenthash' : 'hash'
}

function resolve(...args) {
  return path.resolve(process.cwd(), ...args)
}

module.exports = {
  isProd,
  hashMode,
  resolve
}
