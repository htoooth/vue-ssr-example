const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isProd, hashMode } = require('./helper')

const cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  var autoprefixerLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader, autoprefixerLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      const extractCssLoader = {
        loader: MiniCssExtractPlugin.loader
      }

      return [extractCssLoader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = function(options) {
  var output = []
  var loaders = cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

module.exports = ({ env = 'production', autoprefixer, browsers } = {}) => {
  const prodMode = isProd(env)
  const hash = hashMode(env)

  const config = {
    module: {
      rules: styleLoaders({
        sourceMap: true,
        extract: prodMode
      })
    },
    plugins: []
  }

  if (prodMode) {
    config.plugins = [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: `style/[name].[${hash}:7].css`,
        // chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
        allChunks: true
      })
    ]
  }

  return config
}
