const express = require("express"); 
const cors = require("cors");
const routes = require("./routes/routes")

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend/static"));
app.use("/api/auth", routes); 




app.get("/privacy", (req, res)=> {
  res.render("privacy", {title: "privacy policy"});
})

app.get("/signup", (req, res) => {
  res.render("signup", { title: "signup" });
})

app.get("/login", (req, res) => {
  res.render("login", {title: "login"});
})

app.get("/resetpassword", (req, res) => {
  res.render("resetpassword", {title: "reset password"});
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {title: "dashboard"});
})




module.exports = app;
