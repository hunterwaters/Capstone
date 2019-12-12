const express = require("express");
const usersController = require("../controllers/user");

const userRouter = new express.Router();

userRouter.get("/api/v1/users", usersController.getAllUsers);
userRouter.post("/api/v1/users", usersController.create);
userRouter.get("/api/v1/users/:id", usersController.getOneUser);
userRouter.put("/api/v1/users/:id", usersController.updateUser);
userRouter.delete("/api/v1/users/:id", usersController.deleteUser);

module.exports = userRouter;
