const bcrypt = require("bcrypt"); 
const User = require("../models/user");
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");

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


exports.googleAuth = async (req, res) => {
  const { credential, isSignup } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ where: { googleId: payload.sub } });

    if (!user) {
      if (!isSignup) {
        return res.status(404).json({ message: "No account found. Please sign up first" });
      }

      user = await User.create({
        username: payload.email,
        googleId: payload.sub,
        googleEmail: payload.email,
        terms_agreement: true,
      });
    }

    return res.status(200).json({ message: "Google sign-in verified", userID: user.id });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "ERROR" });
  }
};

exports.login = async(req, res) =>{
    const { username, password} = req.body; 

    if(!username || !password){
      return res.status(400).json({message:"Username and Password are required"})
    }

    try{
      const user = await User.findOne({where : {username}})
      
      if(!user){
        return res.status(401).json({message: "Incorrect Username or Password"});
      }

      const isValid = await bcrypt.compare(password, user.password); 

      if(!isValid){
        return res.status(401).json({message: "Incorrect Username or Password"}); 
      }

      //syntax parameter jwt.sign(payload, secret key, options/callback)
      const token = jwt.sign(
        {userId: user.id, username: user.username},//payload
        process.env.JWT_SECRET,//secret key 
        {expiresIn: "1h"}//options 
      );

      return res.status(200).json({
        message:"Login Successful",
        token, 
        user:{
          id: user.id,
          username: user.username
        }
      })
    }catch(error){
      console.error(error); 
      return res.status(500).json({message: "Something Went Wrong"});
    }
}