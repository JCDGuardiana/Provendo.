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
  const { product_name, product_code, unit, stock, cost_price, price, stock_level } = req.body;

  const empty = (v) => v === undefined || v === null || v === "";

  if (!product_name || !product_code || !unit ||
      empty(stock) || empty(cost_price) || empty(price) || empty(stock_level)) {
    return res.status(400).json({ message: "All fields must fill up" });
  }

  try {
    const newProduct = await product.create({
      product_name,
      product_code,
      product_unit: unit,
      product_cost_price: cost_price,
      product_selling_price: price,
      stock,
      stock_level,
    });

    return res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Product code already exists" });
    }
    console.log("Error : ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.get_product = async (req, res) => {
  try{
      const newProduct = await product.findAll({
      order:[["id"]],
      raw: true
    })

    return res.status(200).json({ newProduct })
  }catch(error){
    console.log(error)
  }
}
