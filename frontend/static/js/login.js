document.getElementById("forms").addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value;

  try{
    const res = await fetch("http://localhost:3000/api/auth/login",{
      method: "POST", 
      header: {"Content-Type":"application/json"},
      body: JSON.stringify({username, password})
    })
    const data = await res.json();
  }
  catch(error){
    console.log(error);
  }
});