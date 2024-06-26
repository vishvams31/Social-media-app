// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const multer = require('multer')
// const path = require('path')
const express = require("express");
const verifyUserToken = require("../middleware/authMiddleware");
const usersController = require("../controller/usersController");

const usersRouter = express.Router();

usersRouter.put("/:id", verifyUserToken, usersController.updateUser);
// usersRouter.delete("/:id", usersController.deleteUser)
usersRouter.get("/", usersController.getUser);
usersRouter.get("/friends/:userId", usersController.getFriends);
usersRouter.put("/:id/follow", usersController.follow);
usersRouter.put("/:id/unfollow", usersController.unfollow);
usersRouter.get("/exists/:username", usersController.findUser);
usersRouter.get("/userObject", usersController.userFromToken);

module.exports = usersRouter;
