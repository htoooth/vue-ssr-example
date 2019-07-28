const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const cssLoader = require('./utils/css-loader')
const fontLoader = require('./utils/font-loader')
const imageLoader = require('./utils/image-loader')
const jsLoader = require('./utils/js-loader')
const vueLoader = require('./utils/vue-loader')
const dllApplyLoader = require('./utils/dll-apply')
const vuessrClientLoader = require('./utils/vueSsrClient-loader')
const env = process.env.NODE_ENV

module.exports = merge(
  baseConfig,
  cssLoader({ env }),
  fontLoader({ env }),
  imageLoader({ env }),
  jsLoader({ env }),
  vueLoader({ env }),
  dllApplyLoader({ env }),
  vuessrClientLoader({ env }),
  {
    devtool: 'cheap-module-source-map',
    target: 'web',

    entry: {
      app: './entry-client.js'
    },

    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },

    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: {
        name: 'runtime'
      }
    }
  }
)
