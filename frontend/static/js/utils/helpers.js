const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password"); 
const eyesOpen = document.getElementById("eyesOpen");
const eyesClosed = document.getElementById("eyesClosed");


const inputType = () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password"; 
  eyesOpen.classList.toggle("hidden")
  eyesClosed.classList.toggle("hidden");
  
}


togglePassword.addEventListener('click', inputType)
