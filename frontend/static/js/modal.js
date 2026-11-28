const openbtn = document.getElementById("add_button"); 
const modal = document.getElementById("form-modal"); 
const closebtn = document.getElementById("cls-btn");
const cancelbtn = document.getElementById("cancel-btn"); 
const add_product_form = document.getElementById("add-product-form");
const search_product = document.getElementById("search-product");
const tbody = document.getElementById("product_table");
const successmsg = document.getElementById("successmsg"); 
const errormsg = document.getElementById("errormsg");

const product = new Map(); 
let editId = null; 


add_product_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const product_name = document.getElementById("product_name").value.trim();
  const product_code = document.getElementById("product_code").value.trim(); 
  const unit = document.getElementById("unit").value.trim(); 
  const stock = document.getElementById("stocks").value.trim(); 
  const price = document.getElementById("price").value.trim(); 
  const cost_price = document.getElementById("product_cost_price").value.trim(); 
  const stock_level = document.getElementById("reorder").value.trim();

  const url = editId ? `/inventory/update_product/${editId}` : `/inventory/add_product`

  
  try{
    const res = await fetch(url, {
      method: editId ? "PUT" : "POST", 
      headers: {"Content-Type" : "application/json"}, 
      body:JSON.stringify({product_name, product_code, unit, stock, cost_price, price, stock_level})
    }); 


    const data = await res.json(); 

    if(res.ok){
      successmsg.textContent = data.message;
      successmsg.classList.remove("hidden");

      if(editId){
        update_row(data.product)
      }else{
        renderProduct(data.product)
      }
      editId = null;
      add_product_form.reset(); 
      modal.classList.add("hidden")


      setTimeout(() => {
      successmsg.classList.add("hidden");
      },2000)
    }
  }catch(error){
      console.log("Eroor : " , error); 
  } 

})


openbtn.addEventListener('click' ,(e) => {
    e.preventDefault(); 
    editId =null
    document.getElementById("modal-title").textContent = "Add product"; 
    document.getElementById("submit").textContent = "Add"
    modal.classList.remove("hidden"); 
})

closebtn.addEventListener("click", clsModal); 
cancelbtn.addEventListener("click", clsModal); 

function clsModal(e){
    e.preventDefault(); 
    editId = null; 
    add_product_form.reset();
    modal.classList.add("hidden"); 
}

function renderProduct(p) {    
  const row = document.createElement("tr");   
  row.dataset.id = p.id; 
  product.set(Number(p.id) ,p)

  const data = [
    tbody.children.length + 1, 
    p.product_name, 
    p.product_code,
    p.product_unit, 
    p.stock, 
    p.product_cost_price, 
    "₱" + p.product_selling_price,
    p.stock_level
  ]

  data.forEach((v) => {
    const td = document.createElement("td"); 
    td.className = "p-4";
    td.textContent = v; 
    row.appendChild(td); 
  })


  const action = document.createElement("td"); 
  action.className = "p-4";
  action.innerHTML = `  <div class="button-container">
                    <button
                      type="button"
                      data-action="edit"
                      aira-label = "Edit"
                      class="rounded border border-gray-300 p-2 text-xs bg-green-600 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        aria-label="Edit"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      data-action="delete"
                      aria-label="Delete"
                      class="rounded border border-gray-300 p-2 text-xs bg-red-600 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        aria-label="Delete"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>`
  row.appendChild(action); 

  tbody.appendChild(row);
}

async function loadProducts(){
  try{
  const res = await fetch("/inventory/get_product")
  const data = await res.json(); 
  data.newProduct.forEach(renderProduct)
  }catch(error){
    console.log("Erorr : " , error);
  }
}

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]"); 
  if(!btn) return; 

  const row = btn.closest("tr"); 
  const id = Number(row.dataset.id); 
  
  if(btn.dataset.action === "edit"){
    editModal(id)
  }else{
    deleteProduct(id, row);
  }

})


function editModal(id){
  const p = product.get(id); 
    modal.classList.remove("hidden");

  if(!p) return; 

  editId = id;

  const product_name = document.getElementById("product_name").value  = p.product_name;
  const product_code = document.getElementById("product_code").value  = p.product_code; 
  const unit = document.getElementById("unit").value = p.product_unit; 
  const stock = document.getElementById("stocks").value = p.stock; 
  const price = document.getElementById("price").value = p.product_selling_price; 
  const cost_price = document.getElementById("product_cost_price").value = p.product_cost_price; 
  const stock_level = document.getElementById("reorder").value = p.stock_level;

  document.getElementById("modal-title").textContent = "Edit product"; 
  document.getElementById("submit").textContent = "Save"; 
  modal.classList.remove("hidden");
}

function update_row(p){
  product.set(Number(p.id), p);

  const row = tbody.querySelector(`tr[data-id="${p.id}"]`);
  if(!row) return; 

  row.children[1].textContent = p.product_name;
  row.children[2].textContent = p.product_code;
  row.children[3].textContent = p.product_unit;
  row.children[4].textContent = p.stock;
  row.children[5].textContent = p.product_cost_price;
  row.children[6].textContent = "₱" + p.product_selling_price;
  row.children[7].textContent = p.stock_level;
}

const deleteProduct = async (id, row) => {
  if(!confirm("Delete this product??")) return; 

  try{
    const res = await fetch(`/inventory/delete_product/${id}`, {method: "DELETE"}); 

    row.remove();
    product.delete(id); 
    renumberRow(); 
    successmsg.textContent = "Deleted successfully"; 
  }catch(error){
    console.log(error)
  }
}

search_product.addEventListener("input", () => {
    const input = search_product.value.trim().toLowerCase(); 
    let result = 0; 

    tbody.querySelectorAll("tr[data-id]").forEach((row) => {
      const product_name = row.children[1].textContent.toLowerCase();
      const product_code = row.children[2].textContent.toLowerCase(); 

      const match = product_name.includes(input) || product_code.includes(input)
      row.classList.toggle("hidden", !match);
      
      if(match){
        row.children[0].textContent = result
        result++; 
      }
    })


    //if no product exist 
    let noResult = document.getElementById("no-result"); 
    const showResult = result === 0 & input === ""
    if(noResult){
      noResult = document.createElement("tr");
    noResult.id = "no-results-row";
    noResult.innerHTML = `<td colspan="9" class="p-4">No products found</td>`;
    tbody.appendChild(noResult);
    }else{
      noResult.remove()
    }

})

loadProducts();