const express = require("express"); 
const cors = require("cors");
const routes = require("./routes/routes")
const parser = require("cookie-parser")
const path = require("path"); 
const cookieParser = require("cookie-parser");



const app = express();


app.set("view engine", "ejs");
app.set("views", "./views");
app.set("views", path.join(__dirname, "views")); 

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend/static")));

app.use((req, res, next) => {
  res.locals.currentPath = res.path
  res.locals.user = {id: 1, username: "test_user"};
  next();
})


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

app.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword", {title: "forgotpassword"});
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {title: "dashboard"});
})




module.exports = app;
