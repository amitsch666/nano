const express = require('express');
require('dotenv').config();
const path = require('path');
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const passport = require('passport');
const favicon = require('serve-favicon');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const api = require('./lib/api/index');
const users = require('./lib/api/users');
const authentication = require('./lib/api/authentication');

app.prepare()
  .then(() => {
    const server = express();

    server.use(compression());
    server.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    // Express Session middleware
    // ---------------------------------------------------------------
    server.use(expressSession({
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 172800,
      }),
      saveUninitialized: false,
      resave: false,
    }));
    // ---------------------------------------------------------------

    // Passport initialization middleware
    // ---------------------------------------------------------------
    server.use(passport.initialize());
    server.use(passport.session());
    // ---------------------------------------------------------------

    // Custom build resources aliases
    // ---------------------------------------------------------------
    server.use('/_s', express.static(path.join(__dirname, '.build/static')));
    server.use('/_next/webpack/static', express.static(path.join(__dirname, '.build/static')));
    // ---------------------------------------------------------------

    // Custom/dynamic routes
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
    // ---------------------------------------------------------------
    server.use('/api', api);
    server.use('/api/users', users);
    server.use('/api/authentication', authentication);
    // ---------------------------------------------------------------

    // Default route (not to be edited)
    server.get('*', (req, res) => {
      res.locals.user = req.user || null;
      handle(req, res);
    });

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Listening on port ${process.env.PORT}...`); // eslint-disable-line no-console
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
