module.exports = ({ env = 'production' } = {}, ignores) => {
  const config = {
    module: {
      rules: ignores || [
        {
          test: /\.s?css$/,
          use: 'ignore-loader'
        },
        {
          test: /\.sass$/,
          use: 'ignore-loader'
        },
        {
          test: /\.less$/,
          use: 'ignore-loader'
        },
        {
          test: /\.styl(us)?$/,
          use: 'ignore-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: 'ignore-loader'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: 'ignore-loader'
        }
      ]
    }
  }

  return config
}
