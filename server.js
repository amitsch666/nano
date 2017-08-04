const express = require('express');
require('dotenv').config();
const path = require('path');
const next = require('next');
const compression = require('compression');
const favicon = require('serve-favicon');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const api = require('./lib/api');

app.prepare()
  .then(() => {
    const server = express();

    server.use(compression());
    server.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));

    // Custom build resources aliases
    server.use('/_s', express.static(path.join(__dirname, '.build/static')));
    server.use('/_next/webpack/static', express.static(path.join(__dirname, '.build/static')));

    // Custom routes(s)
    // ---------------------------------------------------------------
    // server.get('/blog/:slug', (req, res) => {
    //   const mergedQuery = Object.assign({}, req.query, req.params);
    //   return app.render(req, res, '/blog', mergedQuery);
    // });
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post'
    //   const queryParams = { id: req.params.id }
    //   app.render(req, res, actualPage, queryParams)
    // })
    // ---------------------------------------------------------------

    // API router
    server.use('/api', api);

    // Default route (not to be edited)
    server.get('*', (req, res) => handle(req, res));

    // Normalize a port into a number, string, or false.
    function normalizePort(val) {
      const port = parseInt(val, 10);
      if (isNaN(port)) {
        // named pipe
        return val;
      }
      if (port >= 0) {
        // port number
        return port;
      }
      return false;
    }

    // Get port from environment and store in Express.
    const port = normalizePort(process.env.PORT || '3000');
    server.set('port', port);

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Listening on port ${port}...`); // eslint-disable-line no-console
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
