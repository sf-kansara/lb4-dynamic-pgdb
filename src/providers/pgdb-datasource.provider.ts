import {inject, Provider} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {Request, RestBindings} from '@loopback/rest';
import {dbMap} from '../db-cache';

export class PgDbDatasourceProvider
  implements Provider<Promise<juggler.DataSource>>
{
  constructor(@inject(RestBindings.Http.REQUEST) private request: Request) {}

  value() {
    return this.main();
  }

  main() {
    return new Promise<juggler.DataSource>(async (res, rej) => {
      let dbName = this.request.headers['x-pg-db'] ?? 'rakuten-pms';
      if (Array.isArray(dbName)) {
        dbName = 'rakuten-pms';
      }
      const cached = dbMap.get(dbName);
      if (cached) {
        console.log('Cache Hit!');
        res(cached);
      } else {
        console.log('Cache Miss!');
        const configEnv = {
          connector: 'postgresql',
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'password',
          database: dbName,
          schema: 'public',
        };
        const db = new juggler.DataSource(configEnv);
        // await db.connect();
        // setTimeout(() => {
        //   console.log('provider', db);
        //   res(db);
        // }, 0);
        db.connect();
        res(db);
        dbMap.set(dbName, db);
      }
    });
  }
}
