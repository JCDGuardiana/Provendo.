function toggleInventory(){
   const menu = document.getElementById("inventory-links"); 
   const container = document.getElementById("dropdown-menu");
   let arrow = document.getElementById("arrow-icon"); 

   menu.classList.toggle("hidden");

   const isHidden = menu.classList.contains("hidden");
   arrow.style.transform = isHidden ? "rotate(0deg)" : "rotate(90deg)";

}