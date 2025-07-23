const { mongoose, Model } = require("mongoose");
const express = require("express");

const City_Controller = require("../controller/city.controller");
const City_router = express.Router();

City_router.get("/", City_Controller.getCity);
City_router.post("/", City_Controller.createCity);
City_router.get("/:id", City_Controller.getCityById);
City_router.put("/:id", City_Controller.updateCity);
City_router.delete("/:id", City_Controller.deleteCity);


module.exports = City_router;