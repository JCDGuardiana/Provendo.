const {DataTypes} = require('sequelize'); 
const sequalize = require('../config/db_con'); 

const supplier = sequalize.define(
  'product', 
  {
    suppliers_name:{
      type: DataTypes.STRING, 
      allowNull: false
    },
    contact_person:{
      type: DataTypes.STRING, 
      allowNull: false,   
    },
    contact_number:{
      type: DataTypes.INTEGER, 
      allowNull: false, 
    },
    contact_email: {
      type: DataTypes.STRING, 
      allowNull: false
    }, 
    category:{
      type: DataTypes.STRING, 
      allowNull: false
    },
    supplier_address:{
      type: DataTypes.STRING, 
      allowNull: false
    }, 
    suppliers_status:{
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: "Active"
    }
  }
)

module.exports = supplier