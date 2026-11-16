require("dotenv").config(); 
const app = require("./app"); 
const sequelize = require("./config/db_con");
const user = require("./models/user");
const product = require("./models/product");

const port = process.env.PORT; 

user.hasMany(product, {foreignKey : "userId"});
product.belongsTo(user, {foreignKey : "userId"})



sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("SERVER IS RUNNING");
  });

}).catch((err) => {
  console.log(err);
})