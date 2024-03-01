// const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const Post = require("../models/Post")
const User = require("../models/User")
//create a post
const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
};
//update a post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await (post.updateOne({ $set: req.body }));
            res.status(200).json("the post has been updated")
        }
        else {
            res.status(404).json("post not found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
};
//delete a post

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("post not found");
        }
        const imageName = post.img;
        const imagePath = path.join(__dirname, '../public/images', imageName);

        // Check if the file exists
        fs.access(imagePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error('File does not exist');
                return res.status(500).json({ message: 'File does not exist' });
            }
            // Wrap fs.unlink in a Promise to use await
            const deleteFile = new Promise((resolve, reject) => {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting file', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            //delete the picture from the server side
            await deleteFile;
            // Delete the post from the database
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//like a post

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("The post has been liked")
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("the post has been disliked")
            }
        }
        else {
            res.status(404).json("This post doesn't exist")
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
//get timeline
const timeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        if (currentUser) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const userPosts = await Post.find({ userId: currentUser._id }).skip(skip).limit(limit);
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId }).skip(skip).limit(limit);
                })
            );

            const totalPosts = userPosts.length + friendPosts.reduce((total, posts) => total + posts.length, 0);

            res.status(200).json({
                posts: userPosts.concat(...friendPosts),
                totalPosts,
                page,
                limit
            });
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
// get user's all post
const userPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const posts = await Post.find({ userId: user._id }).skip(skip).limit(limit);
            const totalPosts = await Post.countDocuments({ userId: user._id });

            res.status(200).json({
                posts,
                totalPosts,
                page,
                limit
            });
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    timeline,
    userPosts
} 