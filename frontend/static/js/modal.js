const openbtn = document.getElementById("add_button"); 
const modal = document.getElementById("form-modal"); 
const closebtn = document.getElementById("cls-btn");
const cancelbtn = document.getElementById("cancel-btn"); 
const add_product_form = document.getElementById("add-product-form");

let count = 0; 



add_product_form.addEventListener('submit', (e) => {
  const product_name = document.getElementById("product_name").value.trim();
  const product_code = document.getElementById("product_code").value.trim(); 
  const unit = document.getElementById("unit").value.trim(); 
  const stock = document.getElementById("stocks").value.trim(); 
  const price = document.getElementById("price").value.trim(); 
    const stock_level = document.getElementById("reorder").value.trim();



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