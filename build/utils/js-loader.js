const TerserJSPlugin = require('terser-webpack-plugin')
const { isProd, resolve } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  const prodMode = isProd(env)

  const config = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          include: [resolve('src')],
          loader: 'babel-loader?cacheDirectory=true'
        }
      ]
    }
  }

  if (prodMode) {
    config.optimization = {
      minimizer: [
        new TerserJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            mangle: true,
            ie8: true,
            output: {
              comments: false
            }
          }
        })
      ]
    }
  }

  return config
}
