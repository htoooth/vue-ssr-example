const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ignoreLoader = require('./ignore-loader')

module.exports = ({ env }) => {
  return merge(ignoreLoader(), {
    devtool: 'cheap-module-source-map',
    target: 'node',

    output: {
      libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
      whitelist: /\.css$/
    }),
    plugins: [
      // 生成 `vue-ssr-server-manifest.json`。
      new VueSSRServerPlugin()
    ]
  })
}
