const { hashMode, resolve } = require('./helper')

module.exports = ({
  env = 'production',
  dir = [resolve('src/assets/font')]
} = {}) => {
  const hash = hashMode(env)

  return {
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          include: [...dir],
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
