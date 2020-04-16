import path from 'path';
import config from '../config';
import { createConnection } from 'typeorm';

const { database } = config;

export default () => {
  return createConnection({
    type: 'postgres',
    synchronize: true,
    url: database.url,
    port: Number(database.port),
    username: database.username,
    password: database.password,
    database: database.name,
    migrations: [path.join(__dirname, '..', '/migration/*.ts')],
    entities: [path.join(__dirname, '..', '/entity/*.ts')],
  });
};
