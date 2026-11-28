const suppliers = require("../models/supplier"); 
const supplierController = require("../controllers/suppliers_controller");
const {where, Op} = reqiure("sequalize");

exports.suppliers = async (req, res) => {
  try{
    return res.render("purchasing/supplier", {
      title: "suppliers"
    })
  }catch(error){
    console.log(error)
  }
}