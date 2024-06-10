const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controller/user_controller");

UserRouter.post("/createUser", UserController.createUser);
UserRouter.post("/updateuser/:user_id", UserController.updateUserById);
UserRouter.get("/userdetails",UserController.fetchUserData);
UserRouter.delete("/address/:user_id",UserController.deleteUserAddress)

module.exports = UserRouter;