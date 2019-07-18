const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const server = express()

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const resolve = file => path.resolve(__dirname, file)

const template = require('fs').readFileSync(resolve('./src/index.template.html'), 'utf-8')
const serverBundle = require(resolve('./dist/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('./dist/vue-ssr-client-manifest.json'))

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15
  }),
  runInNewContext: false,
  template,
  clientManifest
})

const serve = (path) => express.static(resolve(path))

server.use('/dist', serve('./dist'))
server.use('/public', serve('./public'))

server.get('*', (req, res) => {

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 401) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
});

server.listen(8000, () => {
  console.log('start server at ', 'http://localhost:8000')
})