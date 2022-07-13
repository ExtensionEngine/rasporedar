import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface ClassroomAttributes {
  id: number;
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

type ClassroomCreationalAttributes = Optional<ClassroomAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Classroom extends Model<ClassroomAttributes, ClassroomCreationalAttributes> implements ClassroomAttributes {
  declare id: number;
  declare name: string;
  declare capacity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
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
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    sequelize,
    modelName: 'Classroom',
    tableName: 'Classrooms',
    timestamps: true,
  },
);

export default Classroom;
