const DllPlugin = require('webpack/lib/DllPlugin')
const cssLoader = require('./css-loader')
const fontLoader = require('./font-loader')
const imageLoader = require('./image-loader')
const jsLoader = require('./js-loader')
const merge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
const { resolve } = require('./helper')

module.exports = ({ env = 'production', webpackConfig = {} } = {}) => {
  const config = {
    output: {
      filename: '[name].[chunkhash:7].dll.js',
      path: resolve('_dll_'),
      library: '_dll_[name]_[chunkhash:7]'
    },
    plugins: [
      new DllPlugin({
        context: __dirname, // 必须要加上这条
        name: '_dll_[name]_[chunkhash:7]',
        path: resolve('_dll_', '[name].dll.json')
      }),
      new AssetsPlugin({
        filename: 'vendor.manifest.json',
        prettyPrint: true,
        fullPath: false,
        path: resolve('_dll_')
      })
    ]
  }

  return merge(
    cssLoader({ env }),
    fontLoader({ env }),
    imageLoader({ env }),
    jsLoader({ env, sourceMap: true }),
    config,
    webpackConfig
  )
}
