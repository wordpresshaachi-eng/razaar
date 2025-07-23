const { mongoose, Model } = require("mongoose");
const express = require("express");
const role_controller = require("../controller/role.controller");

const role_router = express.Router();


role_router.get("/", role_controller.getRole);
role_router.post("/", role_controller.createRole);
role_router.get("/:id", role_controller.getRoleById);
role_router.put("/:id", role_controller.updateRole);
role_router.delete("/:id", role_controller.deleteRole);


module.exports = role_router;