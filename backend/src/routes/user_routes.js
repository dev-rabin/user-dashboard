const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/user_controller");

UserRouter.post("/createUser", UserController.createUser);
UserRouter.patch("/updateuser/:user_id", UserController.updateUserById);

module.exports = UserRouter;