const path = require('path')
const { hashMode, isProd } = require('./utils/helper')
const prodMode = isProd(process.env.NODE_ENV)
const hash = hashMode(process.env.NODE_ENV)

module.exports = {
  context: path.resolve(__dirname, '../src'),
  mode: prodMode ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: `js/[name].[${hash}:7].js`
  },

  module: {
    rules: []
  },

  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public')
    }
  },

  plugins: []
}
