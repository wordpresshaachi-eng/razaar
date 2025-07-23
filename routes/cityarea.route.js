const { mongoose, Model } = require("mongoose");
const express = require("express");

const CityArea_Controller = require("../controller/cityarea.controller");
const CityArea_router = express.Router();

CityArea_router.get("/", CityArea_Controller.getCityArea);
CityArea_router.post("/", CityArea_Controller.createCityArea);
CityArea_router.get("/:id", CityArea_Controller.getCityAreaById);
CityArea_router.put("/:id", CityArea_Controller.updateCityArea);
CityArea_router.delete("/:id", CityArea_Controller.deleteCityArea);


module.exports = CityArea_router;