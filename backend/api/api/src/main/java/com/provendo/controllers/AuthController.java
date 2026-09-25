package com.provendo.controllers;




@RestController
@CrossOrigin(origin = "*")
@RequestMapping("api/auth")
public class AuthController {
  
  public  user(){
    private String username; 
    private String password;

    //setters 
    public void setUsername(String username){
      this.username = username;
    }

    public void setPassword(String password){
      this.password = password; 
    }

    //getters 
    public String getUsername(){
      return username; 
    }

    public String getPassword(){
      return password;
    }
  }
  
}
