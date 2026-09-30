document.getElementById("forms").addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value;



  try{
    const res = await fetch("http://localhost:3000/api/auth/login",{
      method: "POST", 
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({username, password})
    })

      const data = await res.json(); 
      console.log("RESPONSE: ",data)

    if(res.ok){
      window.location.href = "dashboard.html"
    }
  }
  catch(error){
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
    text: "signin_with",
    width: 350,
    cursor: "pointer",
  });
});

async function responseHandler(response) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "dashboard.html"; // or wherever logged-in users land
    }
  } catch (error) {
    console.error(error);
  }
}