const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const vueLoader = require('./utils/vue-loader')
const vuessrServerLoader = require('./utils/vueSsrServer-loader')
const env = process.env.NODE_ENV

module.exports = merge(
  baseConfig,
  vueLoader({ env }),
  vuessrServerLoader({ env }),
  {
    entry: './entry-server.js'
  }
)
