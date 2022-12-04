import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../connection'
import User from './User';

interface NoteAttributes {
  id: number;
  user_id: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface IngredientInput extends Optional<NoteAttributes, 'id'> { }
export interface IngredientOuput extends Required<NoteAttributes> { }


class Note extends Model<NoteAttributes, IngredientInput> implements NoteAttributes {
  public id!: number
  public user_id!: number
  public text!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize,
  paranoid: true
});

export default Note;
