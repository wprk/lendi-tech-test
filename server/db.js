import { Sequelize } from 'sequelize';

import l from './common/logger';

export default new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE_PATH,
  logging: msg => {
    const debug = process.env.DATABASE_DEBUG === 'true';

    return debug ? l.debug(msg) : false;
  },
});
