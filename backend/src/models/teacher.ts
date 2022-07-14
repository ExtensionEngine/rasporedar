import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from 'database/connection';

interface TeacherAttributes {
  id: number;
  firstName: string;
  lastName: string;
  teacherCode: string;
  createdAt: Date;
  updatedAt: Date;
}

type TeacherCreationalAttributes = Optional<TeacherAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Teacher extends Model<TeacherAttributes, TeacherCreationalAttributes> implements TeacherAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare teacherCode: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.CITEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.CITEXT,
      allowNull: false,
    },
    teacherCode: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: true,
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
    modelName: 'Teacher',
    tableName: 'Teachers',
    timestamps: true,
  },
);

export default Teacher;
