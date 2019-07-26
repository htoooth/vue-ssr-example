const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
          exclude: /node_modules/
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
