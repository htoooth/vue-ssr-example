const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const cssLoader = require('./utils/css-loader')
const fontLoader = require('./utils/font-loader')
const imageLoader = require('./utils/image-loader')
const jsLoader = require('./utils/js-loader')
const vueLoader = require('./utils/vue-loader')
const env = process.env.NODE_ENV

module.exports = merge(
  baseConfig,
  cssLoader({ env }),
  fontLoader({ env }),
  imageLoader({ env }),
  jsLoader({ env }),
  vueLoader({ env }),
  {
    devtool: 'source-map',
    target: 'web',

    entry: {
      app: './entry-client.js'
    },
    plugins: [
      // 此插件在输出目录中
      // 生成 `vue-ssr-client-manifest.json`。
      new VueSSRClientPlugin()
    ],
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: {
        name: 'runtime'
      }
    }
  }
)
