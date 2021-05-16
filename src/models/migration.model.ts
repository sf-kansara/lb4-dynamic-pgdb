import {Entity, model, property} from '@loopback/repository';

@model({name: 'migrations'})
export class Migration extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  run_on?: string;

  constructor(data?: Partial<Migration>) {
    super(data);
  }
}

export interface MigrationRelations {
  // describe navigational properties here
}

export type MigrationWithRelations = Migration & MigrationRelations;
