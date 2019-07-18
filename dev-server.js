const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const server = express()
const resolve = file => path.resolve(__dirname, file)

const templatePath = resolve('./src/index.template.html')
const { createBundleRenderer } = require('vue-server-renderer')

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

let readyPromise
let renderer

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false
  }))
}

readyPromise = require('./build/setup-dev-server')(
  server,
  templatePath,
  (bundle, options) => {
    try {
      renderer = createRenderer(bundle, options)
    } catch (e) {
      console.log(e)
    }
  }
)

function render(req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'vue ssr test', // default title
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)

    console.log(`request ${req.url}: ${Date.now() - s}ms`)
  })
}

const serve = (path) => express.static(resolve(path))

server.use('/dist', serve('./dist'))
server.use('/public', serve('./public'))

server.get('*', (req, res) => {
  readyPromise.then(() => render(req, res)).catch(e => console.error(e))
});

server.listen(8000, () => {
  console.log('debug start server at: ', 'http://localhost:8000')
})