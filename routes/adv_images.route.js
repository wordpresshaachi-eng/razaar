const { mongoose, Model } = require("mongoose");
const express = require("express");

const adv_images_Controller = require("../controller/adv_images.controller");
const adv_images_router = express.Router();

adv_images_router.get("/", adv_images_Controller.getAdvImages);
adv_images_router.post("/", adv_images_Controller.createAdvImages);
adv_images_router.get("/:id", adv_images_Controller.getAdvImagesById);
adv_images_router.put("/:id", adv_images_Controller.updateAdvImages);
adv_images_router.delete("/:id", adv_images_Controller.deleteAdvImages);


module.exports = adv_images_router;