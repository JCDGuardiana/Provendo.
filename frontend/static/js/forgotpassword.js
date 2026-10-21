document.addEventListener("DOMContentLoaded", () => {
  let count = 1; 
  
  //doms containing the sections and dots
  const section = document.querySelectorAll("section[data-step]");
  const dots = document.querySelectorAll("#dot span");

  //first step 
  const forms = document.getElementById("emailform");
  const email = document.getElementById("email");
  const button = document.getElementById("sendBTN");

  //second step 
  const codeError = document.getElementById("codeError");
  const codebox = document.querySelectorAll(".codebox")
  const codeform = document.getElementById("codeform");
  const code = document.getElementById("code");

  //third step 
  const formpassword = document.getElementById("formpassword");
  const pwd1 = document.getElementById("pw1");
  const pwd2 = document.getElementById("pw2");
  const pwdError = document.getElementById("pwdError");



  
});