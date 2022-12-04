import { Sequelize, DataTypes, Dialect } from 'sequelize';
import path from 'path';
require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });
// TODO: change here as string
const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: process.env.NODE_ENV !== 'test'
});

export default sequelize;
