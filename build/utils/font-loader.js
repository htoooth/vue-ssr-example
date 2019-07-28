const { hashMode, resolve } = require('./helper')

module.exports = ({ env = 'production' } = {}) => {
  const hash = hashMode(env)

  return {
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          include: [resolve('src/assets/font')],
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
