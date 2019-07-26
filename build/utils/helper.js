function isProd(env) {
  return env === 'production'
}

function hashMode(env) {
  return isProd(env) ? 'contenthash' : 'hash'
}

module.exports = {
  isProd,
  hashMode
}
