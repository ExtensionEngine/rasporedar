import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'database/connection';

// eslint-disable-next-line no-use-before-define
class Classroom extends Model<InferAttributes<Classroom>, InferCreationAttributes<Classroom>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare capacity: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Classroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        msg: 'Capacity can not be 0 or lower',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['id', 'updatedAt'],
      },
    },
    sequelize,
    modelName: 'Classroom',
    tableName: 'Classrooms',
    timestamps: true,
  },
);

export default Classroom;
