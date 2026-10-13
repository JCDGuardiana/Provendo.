document.addEventListener("DOMContentLoaded", () => {
  let count = 1; 
  
  //doms containing the sections and dots
  const section = document.querySelectorAll("section[data-step]");
  const dots = document.querySelectorAll("#dot");

  //first step 
  const forms = document.getElementById("forms");
  const email = document.getElementById("email");
  const button = document.getElementById("submitBtn");

  //second step 
  const codeError = document.getElementById("codeError");
  const codebox = document.querySelectorAll(".codebox")






  console.log(section, dots);



});