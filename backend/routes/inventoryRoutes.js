const express = require("express");
const router = express.Router();
//inventory routes

const {stock_entry,  stock_onhand, add_product, get_product} = require("../controllers/product_controller");


router.get("/stock_entry", stock_entry);
router.get("/stock_onhand", stock_onhand);
router.get("/get_product", get_product);

router.post("/add_product", add_product);
module.exports = router;