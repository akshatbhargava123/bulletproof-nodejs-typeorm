import { Container } from 'typedi';
import mailgun from 'mailgun-js';
import { Connection } from 'typeorm';
import LoggerInstance from './logger';
import config from '../config';

interface DIOptions {
  connection: Connection;
}

export default ({ connection }: DIOptions) => {
  try {
    // TODO: inject connection and repositories
    connection.driver;
    // models.forEach(m => {
    //   Container.set(m.name, m.model);
    // });

    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
