const express = require('express')
const postsController = require('../controller/postsController')
const postsRouter = express.Router()

postsRouter.post("/", postsController.createPost)
postsRouter.put("/:id", postsController.updatePost)
postsRouter.delete("/:id", postsController.deletePost)
postsRouter.put("/:id/like", postsController.likePost)
postsRouter.get("/:id", postsController.getPost)
postsRouter.get("/timeline/:userId", postsController.timeline)
postsRouter.get("/profile/:username", postsController.userPosts)
module.exports = postsRouter; 