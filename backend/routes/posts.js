const express = require("express");
const postsController = require("../controller/postsController");
const verifyUserToken = require("../middleware/authMiddleware");
const postsRouter = express.Router();

postsRouter.post("/", verifyUserToken, postsController.createPost);
postsRouter.put("/:id", verifyUserToken, postsController.updatePost);
postsRouter.delete("/:id", verifyUserToken, postsController.deletePost);
postsRouter.put("/:id/like", postsController.likePost);
// postsRouter.get("/:id", postsController.getPost)
postsRouter.get("/timeline/:userId", postsController.timeline);
postsRouter.get("/profile/:username", postsController.userPosts);
module.exports = postsRouter;
