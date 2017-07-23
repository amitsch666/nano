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

	server.use(compression())

	server.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')))

	// Custom stylesheet path alias
	server.use('/_s.css', express.static(path.join(__dirname, '.build/main.css')))

  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post'
  //   const queryParams = { id: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })
  //
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // Normalize a port into a number, string, or false.
  function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
      // named pipe
      return val
    }
    if (port >= 0) {
      // port number
      return port
    }
    return false
  }

  // Get port from environment and store in Express.
  const port = normalizePort(process.env.PORT || '3000')
  server.set('port', port)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Listening on port ${port}...`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
