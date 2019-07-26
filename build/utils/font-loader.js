const { hashMode } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  const hash = hashMode(env)

  return {
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 10000,
            name: `font/[name].[${hash}:7].[ext]`
          }
        }
      ]
    },
    plugins: []
  }
}
