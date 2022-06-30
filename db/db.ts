import { Sequelize, DataTypes } from 'sequelize';
import { Pressure } from '../types';

const sequelize = new Sequelize('manul', 'manul', 'Manul', {
  host: 'localhost',
  dialect: 'postgres',
});

const PressureModel = sequelize.define('Pressure', {
  high: DataTypes.INTEGER,
  low: DataTypes.INTEGER,
  pulse: DataTypes.INTEGER,
  message: DataTypes.STRING,
});

export default {
  get(id: string) {
    return PressureModel.findByPk(id);
  },
  getAll() {
    return PressureModel.findAll();
  },
  create(info: Pressure): Promise<any> {
    return PressureModel.create(info);
  },
};
