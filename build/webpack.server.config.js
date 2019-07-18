const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './entry-server.js',
  target: 'node',
  devtool: '#source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [new VueSSRServerPlugin()]
})
