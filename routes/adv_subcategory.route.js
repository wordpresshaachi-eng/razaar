const { mongoose, Model } = require("mongoose");
const express = require("express");

const adv_subcategory_Controller = require("../controller/adv_subcategory.controller");
const adv_subcategory_router = express.Router();

adv_subcategory_router.get("/", adv_subcategory_Controller.getAdvSubCategory);
adv_subcategory_router.post("/", adv_subcategory_Controller.createAdvSubCategory);
adv_subcategory_router.get("/:id", adv_subcategory_Controller.getAdvSubCategoryById);
adv_subcategory_router.put("/:id", adv_subcategory_Controller.updateSubAdvCategory);
adv_subcategory_router.delete("/:id", adv_subcategory_Controller.deleteSubAdvCategory);


module.exports = adv_subcategory_router;