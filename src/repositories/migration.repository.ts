import {bind, BindingScope, inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Migration} from '../models';

@bind({scope: BindingScope.REQUEST})
export class MigrationRepository extends DefaultCrudRepository<
  Migration,
  typeof Migration.prototype.id
> {
  constructor(@inject(`datasources.pgdb`) dataSource: juggler.DataSource) {
    console.log('repo', dataSource);
    super(Migration, dataSource);
  }
}
