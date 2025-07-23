const { mongoose, Model } = require("mongoose");
const express = require("express");

const Advertisement_Controller = require("../controller/advertisement.controller");
const Advertisement_router = express.Router();

Advertisement_router.get("/", Advertisement_Controller.getAdv);
Advertisement_router.post("/", Advertisement_Controller.createAdv);
Advertisement_router.get("/:id", Advertisement_Controller.getAdvById);
Advertisement_router.put("/:id", Advertisement_Controller.updateAdv);
Advertisement_router.delete("/:id", Advertisement_Controller.deleteAdv);


module.exports = Advertisement_router;