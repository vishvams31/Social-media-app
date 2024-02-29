const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose');

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

//update the user  user
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
}

//delete the user

// const deleteUser = async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         try {
//             await User.findByIdAndDelete(req.params.id);
//             res.status(200).json("Account has been deleted");
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(403).json("You can delete only your account!");
//     }
// }
//get a user
const getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({ username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
}
//get friends
const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const friends = await user.followings.slice(skip, skip + limit).map(async (friendId) => {
            return await User.findById(friendId);
        });

        const friendsList = await Promise.all(friends);
        const friendListFiltered = friendsList.map((friend) => {
            const { _id, username, profilePicture } = friend;
            return { _id, username, profilePicture };
        });

        const totalFriends = user.followings.length;
        res.status(200).json({ friends: friendListFiltered, totalFriends });
    } catch (err) {
        res.status(500).json(err);
    }
};
//follow
const follow = async (req, res) => {
    if (req.body.userId !== req.params.id && isValidObjectId(req.body.userId) && isValidObjectId(req.params.userId)) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
}
//unfollow 
const unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id && isValidObjectId(req.body.userId) && isValidObjectId(req.params.userId)) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
}
//find a user
const findUser = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while checking the user.' });
    }
}
module.exports = {
    updateUser,
    // deleteUser,
    getUser,
    getFriends,
    follow,
    unfollow,
    findUser
}