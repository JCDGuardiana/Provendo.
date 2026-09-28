const bcrypt = require("bcrypt"); 
const User = require("../models/user");


exports.signup = async(req, res) => {
  const { username, password, terms_agreement } = req.body;

  if(!username || !password){
    return res.status(400).json({message: "Username and Password should not be empty"});
  }

  if(password.length < 8){
      return res.status(400).json({message: "Password is too short"});
  } 

  if(!terms_agreement){
    return res.status(400).json({message: "You must agree to the Privacy Policy"});
  }

  try{
    const existingUser = await User.findOne({where: {username}});
      if(existingUser){
        return res.status(409).json({message: "Username already Taken"});
      }

    //hashing the password on base 10
    const hashPassword = await bcrypt.hash(password, 10);

    //creating new user 
    const newUser = await User.create({username, password:hashPassword, terms_agreement});
    
    return res.status(201).json({message:"Signup Successful", userID:newUser.id})
  }catch(error){
    console.error(error); 
    return res.status(500).json({ message: "Something went wrong." });

  }
};


exports.googleAuth = async(req, res) => {

}