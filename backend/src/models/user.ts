import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from 'database/connection';

// eslint-disable-next-line no-use-before-define
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  isValidPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  encryptPassword(password: string) {
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || '10'));
  }

  generateToken() {
    const body = { id: this.id, email: this.email };
    return jwt.sign({ user: body }, process.env.JWT_SECRET_KEY || '');
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
      validate: { isEmail: { msg: 'Invalid Email format.' } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password can not be empty. Please enter your password.' },
        len: {
          args: [8, 128],
          msg: 'Password length is either too short or too long. It must be from 8 to 128 characters long.',
        },
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
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await user.encryptPassword(user.password);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          user.password = await user.encryptPassword(user.password);
        }
      },
    },
    defaultScope: {
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
    },
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  },
);

export default User;
