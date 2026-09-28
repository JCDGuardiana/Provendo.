const app = require("./app"); 
const sequelize = require("./config/db_con");
require("dotenv").config(); 


const port = process.env.PORT; 

sequelize.sync({alter:true}).then(() => {
  app.listen(port, () => {
    console.log("DB_ CONNECTED");
  });

}).catch((err) => {
  console.log(err);
})