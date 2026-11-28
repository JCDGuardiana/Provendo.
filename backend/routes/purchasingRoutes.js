const express = require("express"); 
const router = router.express(); 

const {suppliers} = require("../controllers/suppliers_controller"); 


router.get("/suppliers", suppliers);


module.exports = router;