const express = require("express");
const router = express.router;
const product = require("../models/product");
const productController = require("../controllers/product_controller");

exports.stock_entry = async (req, res) => {
  try {
    return res.render("inventory/stock_entry", {
      title: "Stock entry",
    });
  }catch (error) {
    console.error("Error rendering stock entry page:", error);
    return res.status(500).send("Internal Server Error");
  }
}


exports.stock_onhand = async (req, res) => {
  try{
    return res.render("inventory/stock_onhand", {
      title: "Stock onHand"
    })
  }catch(error){
    console.error("Error rendering stock onhand page", error);
    return res.status(500).send("Internal Server Error");
  }
}

exports.add_product = async (req, res) => {
    const {product_name, product_code, unit, stock, price, stock_level} = req.body

    if(!product_name || !product_code || !unit || stock === undefined || price === undefined || !stock_level){
      return res.status("400").send("All fields must fill up");
    }

    try{
    const newProduct = await product.create({
      product_name,

    })

    }catch(error){

    }

    
}


