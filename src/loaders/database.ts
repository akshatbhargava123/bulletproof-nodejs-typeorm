import config from '../config';
import { createConnection } from 'typeorm';

export default async (): Promise<Db> => {
  return createConnection({
    type: 'postgres',
    host: config.databaseURL,
    port: 3306,
    username: '',
    password: 'admin',
    database: 'test',
    entities: [__dirname + '/entity/*.js'],
    synchronize: true,
  })
    .then(connection => {
      // here you can start to work with your entities
    })
    .catch(error => console.log(error));
};
