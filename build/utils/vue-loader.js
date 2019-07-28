const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { resolve } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
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
          include: [resolve('src')],
          loader: 'babel-loader?cacheDirectory=true'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
