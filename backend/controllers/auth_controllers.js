const bcrypt = require("bcrypt"); 
const User = require("../models/user");
const {OAuth2Client} = require("google-auth-library");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) => {
  const { username, password, email, terms_agreement } = req.body;

  if(!username || !password  || !email){
    return res.status(400).json({message: "Username, Email and Password should not be empty"});
  }

  if(password.length < 8){
      return res.status(400).json({message: "Password is too short"});
  } 

  if(!terms_agreement){
    return res.status(400).json({message: "You must agree to the Privacy Policy"});
  }

  if(!email === "" && !email.includes("@") && !email === "gmail.com"){
    return res.status(400).json({message: "Invalid Email"});
  }

  try{
    const existingUser = await User.findOne({where: {username}});
      if(existingUser){
        return res.status(409).json({message: "Username already Taken"});
      }

    //hashing the password on base 10
    const hashPassword = await bcrypt.hash(password, 10);

    //creating new user 
    const newUser = await User.create({username, email, password:hashPassword, terms_agreement});
    
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
        email: payload.email,
        googleEmail: payload.email,
        terms_agreement: true,
      });
    }

    const token = jwt.sign(
      {userId: user.id, username: user.username}, 
      process.env.JWT_SECRET, 
      {expiresIn: "1h"}
    )

    return res.status(200).json({
      message: "Google sign-in successful", 
      token, 
      user:{
        id: user.id, 
        user: user.username
      }
    })
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

exports.forgotpassword = async (req, res) => {
  const {email} = req.body;

  //if all fields are empty
  if(!email){
    return res.status(400).json({message: "Email is required"});
  }

  //check if the email exists in the database
  try{
    const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(404).json({message: "Email does not exist"});
      }

      if(!user.password){
        return res.status(400).json({message: "You cannot reset password for Google account"});
      }

  //if email exists, send a code to the email
      const code = Math.floor(100000 + Math.random() * 900000).toString(); //generate a random 6-digit code

      //hash code before sending it to the email 
      const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
      
      user.resetcode = hashedCode; //store the hashed code in the user model
      user.resetcode_expiry = new Date(Date.now() + 2 * 60 * 1000); //set the code life in 2 minutes 
      
      await user.save(); //save the user model


    //send the code to the email  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is ${code}. It will expire in 2 minutes.`
    }; 


    await transporter.sendMail(mailOptions); 


    return res.status(200).json({message: "Reset code sent to email"});

  }catch(error){
    console.error(error);
    return res.status(500).json({message: "Something went wrong"});
  }
}

exports.codeverify = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "No user exist" });
    }

    if (!user.resetcode || !user.resetcode_expiry) {
      return res.status(400).json({ message: "No reset code found. Please request a new one." });
    }

    // Check if the code has expired first
    if (user.resetcode_expiry < new Date()) {
      return res.status(400).json({ message: "Verification code expired, please request a new one" }); 
    }

    // Hash the incoming code
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    // Compare user.resetcode with hashedCode, and handle mismatch explicitly
    if (user.resetcode !== hashedCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // If we reach here, the code is correct and hasn't expired!
    return res.status(200).json({ message: "Code verified successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


exports.resetpassword = async (req, res) => {
  try{
      const {email, code, newpassword} = req.body 

      if(!email || !code || !newpassword){
        return res.status(400).json({message: "All fields are required"}); 
      }
    
      const user = await User.findOne({where: {email}}); 
      
      if(!user.resetcode || !user.resetcode_expiry){
        return res.status(400).json({message: "No reset code found, please request a new one"});
      }

      if(user.resetcode_expiry < new Date()){
        return res.status(400).json({message : "Code already expired, please request a new one"}); 
      }

      const hashcode =  crypto.createHash("sha-256").update(code).digest("hex"); 

      if(user.resetcode !== hashcode){
        return res.status(400).json({message: "Invalid code"}); 
      }


      const salt = 12; 
      const hashpass = await bcrypt.hash(newpassword, salt); 

      user.password = hashpass; 
      user.resetcode = null; 
      user.resetcode_expiry = null; 
      await user.save(); 

      return res.status(200).json({message: "Password reset successfully"});



  }catch(erorr){
    console.error("error");
    return res.status(500).json({ message: "Something went wrong" });
  }
}