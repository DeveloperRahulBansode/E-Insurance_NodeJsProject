import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Agent = sequelize.define('Agent', {
  agentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'agent',
    allowNull: false,
    validate: {
      isIn: [['agent']]
    }
  },
}, {
  tableName: 'Agents',
  timestamps: true // adds createdAt and updatedAt
});

export { Agent };

