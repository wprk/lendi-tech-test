import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import DB from '../db';

import oas from './swagger';

import l from './logger';

const app = new Express();
const exit = process.exit;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => async () => {
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

      try {
        await DB.authenticate();
        l.info('Database connection established.');
        await DB.sync({ force: true });
        l.info('Database schema synced.');
      } catch (error) {
        l.error('Unable to connect to database. %s', [error]);
      }
    };

    oas(app, this.routes)
      .then(async () => {
        http.createServer(app).listen(port, welcome(port));
      })
      .catch(e => {
        l.error(e);
        exit(1);
      });

    return app;
  }
}
