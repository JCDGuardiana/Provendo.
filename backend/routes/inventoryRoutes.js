const express = require("express");
const router = express.Router();
//inventory routes

const {stock_entry, list, entryForm, stock_onhand} = require("../controllers/product_controller");


router.get("/stock_entry", stock_entry);
router.get("/stock_onhand", stock_onhand);

module.exports = router;