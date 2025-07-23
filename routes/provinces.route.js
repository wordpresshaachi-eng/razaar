const { mongoose, Model } = require("mongoose");
const express = require("express");
const provinces_controller = require("../controller/provinces.controller");

const provinces_router = express.Router();

provinces_router.get("/", provinces_controller.getProvinces);
provinces_router.post("/", provinces_controller.createProvince);
provinces_router.get("/:id", provinces_controller.getProvinceById);
provinces_router.put("/:id", provinces_controller.updateProvince);
provinces_router.delete("/:id", provinces_controller.deleteProvince);


module.exports = provinces_router;