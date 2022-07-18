import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from 'database/connection';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationalAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class User extends Model<UserAttributes, UserCreationalAttributes> implements UserCreationalAttributes {
  declare id: number;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  isValidPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  generateToken() {
    const body = { _id: this.id, email: this.email };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY || '');
    return token;
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
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
    hooks: {
      beforeCreate: async (user: User) => {
        const hash = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS || '10'));
        user.password = hash;
      },
    },
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  },
);

export default User;
