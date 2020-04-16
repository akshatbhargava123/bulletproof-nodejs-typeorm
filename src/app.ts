import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  try {
    // initialise application loaders
    await require('./loaders').default({ expressApp: app });

    // only start app if all loaders are correctly loaded
    app.listen(config.port, err => {
      if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    });
  } catch (error) {
    Logger.error('🔥 %o', error);
  }
}

startServer();
