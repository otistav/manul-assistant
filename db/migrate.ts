// index.js
import sequelize from './connection';
import { Umzug, SequelizeStorage } from 'umzug';

const umzug = new Umzug({
  migrations: { glob: './migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default async function runMigrations() {
  await umzug.up();
}