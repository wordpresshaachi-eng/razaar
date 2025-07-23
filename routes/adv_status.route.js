const { mongoose, Model } = require("mongoose");
const express = require("express");

const adv_status_Controller = require("../controller/adv_status.controller");
const adv_status_router = express.Router();

adv_status_router.get("/", adv_status_Controller.getAdvStatus);
adv_status_router.post("/", adv_status_Controller.createAdvStatus);
adv_status_router.get("/:id", adv_status_Controller.getAdvStatusById);
adv_status_router.put("/:id", adv_status_Controller.updateAdvStatus);
adv_status_router.delete("/:id", adv_status_Controller.deleteAdvStatus);


module.exports = adv_status_router;