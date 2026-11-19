const openbtn = document.getElementById("add_button"); 
const modal = document.getElementById("form-modal"); 
const closebtn = document.getElementById("cls-btn");
const cancelbtn = document.getElementById("cancel-btn"); 
const add_product_form = document.getElementById("add-product-form");
const successmsg = document.getElementById("successmsg"); 
const errormsg = document.getElementById("errormsg");





add_product_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const product_name = document.getElementById("product_name").value.trim();
  const product_code = document.getElementById("product_code").value.trim(); 
  const unit = document.getElementById("unit").value.trim(); 
  const stock = document.getElementById("stocks").value.trim(); 
  const price = document.getElementById("price").value.trim(); 
  const cost_price = document.getElementById("product_cost_price").value.trim(); 
  const stock_level = document.getElementById("reorder").value.trim();

  try{
    const res = await fetch("http://localhost:3000/inventory/add_product", {
      method: "POST", 
      headers: {"Content-Type" : "application/json"}, 
      body:JSON.stringify({product_name, product_code, unit, stock, cost_price, price, stock_level})
    }); 


    const data = await res.json(); 

    if(res.ok){
      successmsg.textContent = data.message;
      setTimeout(() => window.location.reload, 1000);
    }else{
      errormsg.textContent = data.message;
    }
  }catch(error){
      console.log("Eroor : " , error); 
  } 

})


openbtn.addEventListener('click' ,(e) => {
     e.preventDefault(); 

    modal.classList.toggle("hidden"); 
})

closebtn.addEventListener("click", clsModal); 
cancelbtn.addEventListener("click", clsModal); 

function clsModal(e){
    e.preventDefault(); 

    modal.classList.add("hidden"); 
}