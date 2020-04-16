import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import dbLoader from './database';
import Logger from './logger';

// We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const connection = await dbLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the database connection and repositories into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };

  // TODO: inject all the repository connections made from the connection instance
  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({ connection });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
