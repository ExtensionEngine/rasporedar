import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'database/connection';

// eslint-disable-next-line no-use-before-define
class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare teacherCode: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
