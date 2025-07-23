const { mongoose, Model } = require("mongoose");
const express = require("express");
const country_controller = require("../controller/country.controller");

const country_router = express.Router();

country_router.get("/", country_controller.getCountry);
country_router.post("/", country_controller.createCountry);
country_router.get("/:id", country_controller.getCountryById);
country_router.put("/:id", country_controller.updateCountry);
country_router.delete("/:id", country_controller.deleteCountry);


module.exports = country_router;