document.addEventListener("DOMContentLoaded", () => {
  e.preventDefault()

  let currentCount = 1; 
  //first step 
  const forms = document.getElementById("emailform");

  //second step 
  const codeError = document.getElementById("codeError");
  const codebox = document.querySelectorAll(".code-box")
  const codeform = document.getElementById("codeForm");
  const backbtn = document.getElementById("backToEmail"); 
  const resendbtn = document.getElementById("resend");

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
    e.preventDefault()

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

  codeform.addEventListener("submit", async (e) => {
    e.preventDefault()

    const fullcode = Array.from(codebox).map(box => box.value).join("")

    if(fullcode.length !== 6){
      codeError.textContent = "Invalid code"
      codeError.classList.remove = "hidden";
    }


    codeError.classList.add = "hidden";

    try{
      const res = await fetch("http://localhost:3000/api/auth/codeverify", {
          method: "POST", 
          headers: {"Content-type" : "application/json"}, 
          body: JSON.stringify({email, fullcode})
      })

      const data = await res.json();

      if(data.ok){
        currentCount = 3
        steps(currentCount)
      }else{ 
        codeError.textContent = "Something Went Wrong"
        codeError.classList.remove = "hidden"
      }
    }catch(error){
      console.log(error)
    }
  })
});



resendbtn.addEventListener("click", async () => {
  
})


backbtn.addEventListener("click", async () => {
  currentCount = 1;
  steps(currentCount);

  codeError.classList.add("hidden");
})