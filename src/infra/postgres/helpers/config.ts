import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'iupspqwa',
  password: 'CVh7bkRBWsjhs7TMsqwvXx5PfcM06TR0',
  database: 'iupspqwa',
  entities: ['dist/infra/postgres/entities/index.js']
}
