import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  form: JSON;
  timetable: JSON;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationalAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'form' | 'timetable'>;

class User extends Model<UserAttributes, UserCreationalAttributes> implements UserCreationalAttributes {
  declare id: number;
  declare email: string;
  declare password: string;
  declare form: JSON;
  declare timetable: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;

  static scopes() {
    return {
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.CITEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    form: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    timetable: {
      type: DataTypes.JSONB,
      allowNull: true,
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
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  },
);

export default User;
