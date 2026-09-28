const {DataTypes} = require("sequelize"); 
const sequelize = require("../config/db_con")

const user = sequelize.define(
  'user',
  {
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    terms_agreement:
    {
      type: DataTypes.BOOLEAN,
      ischecked: false, 
      allowNull: false
    },
    password:{
      type: DataTypes.STRING, 
      allowNull: false
    }
  }
)

module.exports = user;