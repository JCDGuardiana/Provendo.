const productModel = require("../models/product"); 

exports.stock_entry = async (req, res) => {
  try {
    return res.render("inventory/stock_entry", {
      title: "Stock Entry",
    });
  }catch (error) {
    console.error("Error rendering stock entry page:", error);
    return res.status(500).send("Internal Server Error");
  }
}