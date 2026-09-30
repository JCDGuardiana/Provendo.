const express = require("express"); 
const cors = require("cors");
const routes = require("./routes/routes")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", routes); 


module.exports = app;
