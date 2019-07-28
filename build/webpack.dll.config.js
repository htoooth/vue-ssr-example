const merge = require('webpack-merge')
const dllGenerateLoader = require('./utils/dll-generate')
const env = process.env.NODE_ENV

module.exports = () => {
  return merge(
    dllGenerateLoader({
      env,
      webpackConfig: {
        entry: {
          vendor: ['vue']
        },
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.esm.js'
          }
        }
      }
    }),
    {
      mode: 'production'
    }
  )
}
