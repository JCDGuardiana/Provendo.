const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password"); 
const eyesOpen = document.getElementById("eyesOpen");
const eyesClosed = document.getElementById("eyesClosed");



const inputType = () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password"; 
  eyesOpen.classList.toggle("hidden")
  eyesClosed.classList.toggle("hidden");
  
}


document.getElementById("forms").addEventListener('submit', async(e) => {
    e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value
      const terms_agreement = document.querySelector("#privacy").checked; 

    //execution 
    try{
        const response = await fetch("http://localhost:3000/api/auth/signup", {
        method:"POST",
        headers :{"Content-Type" : "application/json"},
        body: JSON.stringify({username, password, terms_agreement}),
      });

      const data = await response.json()
    }catch(error){
      console.log(error);
    }

});

togglePassword.addEventListener('click', inputType)
