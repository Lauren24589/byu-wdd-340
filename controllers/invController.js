const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

async function buildVehicleDetailView(req, res, next) {
  const inv_id = req.params.inv_id;
  const data = await invModel.getVehicleById(inv_id);
  if (!data) {
    return res.status(404).render("errors/404", { message: "Vehicle not found" });
  }
 
  const vehicleName = `${data.inv_make} ${data.inv_model}`;
  const detailHtml = utilities.buildVehicleDetailView(data);

  res.render("inventory/detail", {  
    title: vehicleName,
    nav: await utilities.getNav(),
    detail: detailHtml,
  });
}  
  

invCont.buildVehicleDetailView = buildVehicleDetailView;

module.exports = invCont;
