const { mongoose, Model } = require("mongoose");
const express = require("express");

const adv_category_Controller = require("../controller/adv_category.controller");
const adv_category_router = express.Router();

adv_category_router.get("/", adv_category_Controller.getAdvCategory);
adv_category_router.post("/", adv_category_Controller.createAdvCategory);
adv_category_router.get("/:id", adv_category_Controller.getAdvCategoryById);
adv_category_router.put("/:id", adv_category_Controller.updateAdvCategory);
adv_category_router.delete("/:id", adv_category_Controller.deleteAdvCategory);


module.exports = adv_category_router;
