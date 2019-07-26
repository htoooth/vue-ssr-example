const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const ignoreLoader = require('./utils/ignore-loader')
const vueLoader = require('./utils/vue-loader')
const env = process.env.NODE_ENV

module.exports = merge(baseConfig, vueLoader({ env }), ignoreLoader(), {
  devtool: 'cheap-module-source-map',
  target: 'node',

  entry: './entry-server.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRServerPlugin()]
})
