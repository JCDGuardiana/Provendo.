const {DataTypes} = require('sequelize');
const sequelize = require('../config/db_con');

const product = sequelize.define(
  'product',
  {
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
    product_status:{
      type:DataTypes.STRING, 
      allowNull: true
    },
    stock_level:{
      type:DataTypes.INTEGER, 
      allowNull: true
    },
    stock:{
      type:DataTypes.INTEGER, 
      allowNull: true
    }
  });

module.exports = product;