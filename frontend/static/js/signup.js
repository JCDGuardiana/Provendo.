document.getElementById("forms").addEventListener('submit', async(e) => {
    e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value
      const email = document.getElementById("email").value;
      const terms_agreement = document.querySelector("#privacy").checked; 

    //execution 
    try{
        const response = await fetch("http://localhost:3000/api/auth/signup", {
        method:"POST",
        headers :{"Content-Type" : "application/json"},
        body: JSON.stringify({username, password, email,terms_agreement}),
      });

      const data = await response.json()
      console.log(data);
      if(response.ok){
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        window.location.href = "/login";
      }
    }catch(error){
      console.log(error);
    }

});

window.addEventListener("load", () => {
  google.accounts.id.initialize({
    client_id: "806643697963-j3fvfujkasjur7smj3o2bkh86i3rik2s.apps.googleusercontent.com",
    callback: responseHandler,
  });

  google.accounts.id.renderButton(document.getElementById("googleBtn"), {
    theme: "outline",
    size: "large",
    text: "signup_with",
    width: 400,
    cursor: "pointer",
  });
});

async function responseHandler(response) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential, isSignup: true}),
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username)
      window.location.href = "/login";
    }
  } catch (error) {
    console.error(error);
  }
}

