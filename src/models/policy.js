import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Policy = sequelize.define('Policy', {
  policyID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  policyName:{
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description:{
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  policyType:{
    type:DataTypes.ENUM('Health', 'Life', 'Vehicle', 'Travel'),
    allowNull:false
  }, 
  premiumAmount: {
    type:DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  coverageAmount: {
    type:DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  durationInYears:{
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
}, {
  tableName: 'Policies',
  timestamps: true
});



export {Policy};
