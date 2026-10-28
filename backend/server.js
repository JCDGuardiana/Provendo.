require("dotenv").config(); 
const app = require("./app"); 
const sequelize = require("./config/db_con");


const port = process.env.PORT; 

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("SERVER IS RUNNING");
  });

}).catch((err) => {
  console.log(err);
})