import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './users.js';

const Contact = sequelize.define('contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name cannot be null',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});
User.hasMany(Contact, { foreignKey: 'owner' });
Contact.belongsTo(User, { foreignKey: 'owner' });

// Contact.sync({ force: true });

export default Contact;
