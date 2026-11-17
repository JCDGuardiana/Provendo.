const openbtn = document.getElementById("add_button"); 
const modal = document.getElementById("form-modal"); 
const closebtn = document.getElementById("cls-btn");
const cancelbtn = document.getElementById("cancel-btn"); 
const add_product_form = document.getElementById("add-product-form");

let count = 0; 


openbtn.addEventListener('click' ,(e) => {
     e.preventDefault(); 

    modal.classList.toggle("hidden"); 
})

add_product_form.addEventListener('submit', (e) => {
    const product_name = document.getElementById("product_name").value.trim();
    const product_code = document.getElementById("product_code").value.trim(); 
    const
})




closebtn.addEventListener("click", clsModal); 
cancelbtn.addEventListener("click", clsModal); 

function clsModal(e){
    e.preventDefault(); 

    modal.classList.add("hidden"); 
}