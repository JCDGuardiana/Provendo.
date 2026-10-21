document.addEventListener("DOMContentLoaded", () => {

  let currentCount = 1; 
  //first step 
  const forms = document.getElementById("emailform");

  //second step 
  const codeError = document.getElementById("codeError");
  const codebox = document.querySelectorAll(".code-box")
  const codeform = document.getElementById("codeForm");

  //third step 
  const formpassword = document.getElementById("formpassword");
  const pwd1 = document.getElementById("pw1");
  const pwd2 = document.getElementById("pw2");
  const pwdError = document.getElementById("pwdError");



  const steps = (currentCount) =>{
    document.querySelectorAll("section[data-step]").forEach((sec) => {
      let count = parseInt(sec.getAttribute("data-step"))

      if(count === currentCount){
        sec.classList.remove("hidden");
      }else{
        sec.classList.add("hidden");
      }
    })


    const dots = document.querySelectorAll("#dots span")
    dots.forEach((dot, index) => {

      if(index + 1 === currentCount){
        dot.className = "h-2 w-8 rounded-full bg-primary transition-all duration-300"
      }else{
        dot.className = "h-2 w-8 rounded-full bg-gray-300 transition-all duration-300"
      }
    })
  } 

  steps(currentCount)

  forms.addEventListener("submit", async (e) => {
     e.preventDefault(); 


     const email = document.getElementById("email").value
     
     try{
        const res = await fetch("http://localhost:3000/api/auth/forgotpassword", {
          method: "POST", 
          headers: {"Content-Type" : "application/json"}, 
          body: JSON.stringify({email})
        })

        const data = await res.json();
        if(data.ok){
          currentCount = 2; 
          steps(currentCount);
        }else{
          return ("Something went wrong");
        }


     }catch(error){
      console.log(error)
     }
  })
});