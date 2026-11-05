const {DataTypes} = require('sequelize');
const sequelize = require('../config/db_con');

const product = sequelize.define(
  'product',
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 
    product_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    product_description:{
      type: DataTypes.STRING,
      allowNull: true
    },
    product_code:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    product_cost_price:{
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    product_selling_price:{
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    product_image:{
      type: DataTypes.STRING,
      allowNull: true 
    },
    product_unit:{
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }
)

module.exports = product;