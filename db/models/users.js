import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import { emailRegexp, passwordRegexp } from '../../constants/auth.js';

const User = sequelize.define('user', {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRegexp,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ['starter', 'pro', 'business'],
    defaultValue: 'starter',
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync();

export default User;
