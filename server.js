const express = require('express')
const path = require('path')
const next = require('next')
const compression = require('compression')
const favicon = require('serve-favicon')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

	server.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));

  server.use(compression())

  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post'
  //   const queryParams = { id: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })
  //
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
