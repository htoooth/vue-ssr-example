const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, '../src'),
  devtool: '#cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },

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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public')
    }
  },
  plugins: [new VueLoaderPlugin()]
}
