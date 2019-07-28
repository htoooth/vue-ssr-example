const TerserJSPlugin = require('terser-webpack-plugin')
const { isProd, resolve } = require('./helper')

module.exports = ({
  env = 'production',
  dir = [resolve('src')],
  sourceMap = false
} = {}) => {
  const prodMode = isProd(env)

  const config = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          include: [...dir],
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
          sourceMap,
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
