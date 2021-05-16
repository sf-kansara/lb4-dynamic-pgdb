import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Migration} from '../models';
import {MigrationRepository} from '../repositories';

export class MigrationController {
  constructor(
    @repository(MigrationRepository)
    public migrationRepository: MigrationRepository,
  ) {}

  @get('/migrations', {
    responses: {
      '200': {
        description: 'Array of Migration model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Migration, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param({in: 'header', name: 'x-pg-db'}) pgdb?: string,
    @param.filter(Migration) filter?: Filter<Migration>,
  ): Promise<Migration[]> {
    console.log('controller');
    return this.migrationRepository.find(filter);
  }
}
