const {DataTypes} = require("sequelize"); 
const sequelize = require("../config/db_con")

const user = sequelize.define(
  'user',
  {
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password:{
      type: DataTypes.STRING, 
      allowNull: true
    },

    googleId:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    
    googleEmail:{
      type: DataTypes.STRING,
      allowNull: true
    },
    
    terms_agreement:
    {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
      allowNull: false
    },
  }
)

module.exports = user;