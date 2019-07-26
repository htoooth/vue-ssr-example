const TerserJSPlugin = require('terser-webpack-plugin')
const { isProd } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  const prodMode = isProd(env)

  const config = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
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
          sourceMap: true,
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
