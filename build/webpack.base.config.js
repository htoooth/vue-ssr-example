const path = require('path')
const prodMode = process.env.NODE_ENV === 'production'

module.exports = {
  context: path.resolve(__dirname, '../src'),
  mode: prodMode ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[hash:7].js'
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
