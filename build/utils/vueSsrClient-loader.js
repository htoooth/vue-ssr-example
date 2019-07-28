const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = ({ env }) => {
  return {
    plugins: [
      // 生成 `vue-ssr-client-manifest.json`。
      new VueSSRClientPlugin()
    ]
  }
}
