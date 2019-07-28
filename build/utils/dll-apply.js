const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const { resolve } = require('./helper')

module.exports = ({
  env = 'production',
  dllFilePath = 'vendor.dll.json'
} = {}) => {
  return {
    plugins: [
      new DllReferencePlugin({
        context: __dirname, // 必龄要加上这条
        manifest: require(resolve('_dll_', dllFilePath))
      })
    ]
  }
}
