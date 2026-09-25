package com.provendo.api.entity;

import jakarta.persistance.*;

@Entity 
@Table(name = "user")
public class User {
  User user = new User(); 

  user.setUsername(request.getUsername());
  user.setPassword(passwordEncoder.encode(request.getPassword()));
}
