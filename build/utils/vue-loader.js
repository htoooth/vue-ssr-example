const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolve } = require('./helper')

module.exports = ({ env = 'production', dir = resolve('src') } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [dir],
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
          include: [dir],
          loader: 'babel-loader?cacheDirectory=true'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
