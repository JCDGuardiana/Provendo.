const express = require("express");
const router = express.Router();

const {stock_entry, list, entryForm} = require("../controllers/product_controller");


router.get("/stock_entry", stock_entry);


module.exports = router;