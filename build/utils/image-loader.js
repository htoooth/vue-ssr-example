const { isProd, hashMode } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  const prodMode = isProd(env)
  const hash = hashMode(env)

  return {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                fallback: 'file-loader',
                limit: 10000,
                name: `image/[name].[${hash}:7].[ext]`
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: prodMode ? false : true
              }
            }
          ]
        }
      ]
    },
    plugins: []
  }
}
