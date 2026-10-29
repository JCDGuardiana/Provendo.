document.addEventListener("DOMContentLoaded", () => {

  let currentCount = 1; 
  let userEmail = ""; 
  let fullcode = "";
  //first step 
  const forms = document.getElementById("emailForm");

  //second step 
  const codeError = document.getElementById("codeError");
  const codebox = document.querySelectorAll(".code-box")
  const codeform = document.getElementById("codeForm");
  const backbtn = document.getElementById("backToEmail"); 
  const resendbtn = document.getElementById("resend");

  //third step 
  const formpassword = document.getElementById("passwordForm");
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

  //step 1 
  forms.addEventListener("submit", async (e) => {
    e.preventDefault()

     userEmail = document.getElementById("email").value.trim();
     
     try{
        const res = await fetch("http://localhost:3000/api/auth/forgotpassword", {
          method: "POST", 
          headers: {"Content-Type" : "application/json"}, 
          body: JSON.stringify({email: userEmail})
        })

        const data = await res.json();
        if(res.ok){
          currentCount = 2; 
          steps(currentCount);
        }

     }catch(error){
      console.log(error)
     }
  })

  //step2 

  codeform.addEventListener("submit", async (e) => {
    e.preventDefault()

    fullcode = Array.from(codebox).map(box => box.value).join("")

    if(fullcode.length !== 6){
      codeError.textContent = "Invalid code"
      codeError.classList.remove("hidden");
      return; 
    }


    codeError.classList.add("hidden");

    try{
      const res = await fetch("http://localhost:3000/api/auth/codeverify", {
          method: "POST", 
          headers: {"Content-type" : "application/json"}, 
          body: JSON.stringify({ email: userEmail, code: fullcode})
      })

      const data = await res.json();

      if(res.ok){
        currentCount = 3
        steps(currentCount)
      }else{ 
        codeError.textContent = "Something Went Wrong"
        codeError.classList.remove("hidden")
        return; 
      }
    }catch(error){
      console.log(error)
    }
  })

  resendbtn.addEventListener("click", async () => {
   const res = await fetch("http://localhost:3000/api/auth/forgotpassword", {
    method: "POST", 
    headers: {"Content-Type" : "application/json"}, 
    body: JSON.stringify({email : userEmail})
   })

   const data = await res.json(); 

   if(res.ok){
     codeError.textContent = "A new code is sent to your email"
     codeError.classList.remove("hidden")
   }else{
     codeError.textContent = "Error something went wrong"
     codeError.classList.remove("hidden")
   }
})


backbtn.addEventListener("click", async () => {
  currentCount = 1;
  steps(currentCount);

  codeError.classList.add("hidden");
})


//step 3 
formpassword.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = pwd1.value;
  const confirmpassword = pwd2.value;

  if (!password || !confirmpassword) {
    pwdError.textContent = "Password and confirm password should not be empty";
    pwdError.classList.remove("hidden");
    return;
  }

  if (password !== confirmpassword) {
    pwdError.textContent = "Password does not match";
    pwdError.classList.remove("hidden");
    return;
  }

  if (password.length < 8) {
    pwdError.textContent = "Weak password strength";
    pwdError.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/resetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, code: fullcode, newpassword: password }),
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      const data = await res.json();
      pwdError.textContent = data.message;
      pwdError.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
    pwdError.textContent = "Could not reach the server";
    pwdError.classList.remove("hidden");
  }
});

});

