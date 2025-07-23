const { mongoose, Model } = require("mongoose");
const express = require("express");

const adv_types_Controller = require("../controller/adv_types.controller");
const adv_types_router = express.Router();

adv_types_router.get("/", adv_types_Controller.getAdvTypes);
adv_types_router.post("/", adv_types_Controller.createAdvTypes);
adv_types_router.get("/:id", adv_types_Controller.getAdvTypesById);
adv_types_router.put("/:id", adv_types_Controller.updateAdvTypes);
adv_types_router.delete("/:id", adv_types_Controller.deleteAdvTypes);


module.exports = adv_types_router;

