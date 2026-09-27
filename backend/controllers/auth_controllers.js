const bcrypt = require("bcrypt"); 
const User = require("../models/user");


exports.signup = async(req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({message: "Username and Password should not be empty"});
  }

  if(password.length < 8){
      return res.status(400).json({message: "Password is too short"});
  } 

  try{
    const existingUser = await User.findOne({where: {username}});
      if(existingUser){
        return res.status(409).json({message: "Username already Taken"});
      }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username, password:hashPassword});
    return res.status(201).json({message:"Signup Successful", userID:newUser.id})
  }catch(error){
    console.error(error); 
  }
};