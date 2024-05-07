const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
};

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
const userFromToken = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      const userId = decoded.userId;
      console.log(userId);
      // Fetch the user by userId
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        res.status(404).json("user not found");
        return;
      }
      // Exclude sensitive fields
      // Send the user object without the password and updatedAt fields
      res.status(200).json(user);
    } else {
      res.status.json("can't decode the token");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    if (user) {
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//get friends
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const friends = await user.followings
        .slice(skip, skip + limit)
        .map(async (friendId) => {
          return await User.findById(friendId);
        });

      const friendsList = await Promise.all(friends);
      const friendListFiltered = friendsList.map((friend) => {
        const { _id, username, profilePicture } = friend;
        return { _id, username, profilePicture };
      });

      const totalFriends = user.followings.length;
      res.status(200).json({ friends: friendListFiltered, totalFriends });
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//follow
const follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const currentUser = await User.findById(req.body.userId);
        if (currentUser) {
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({
              $push: { followings: req.params.id },
            });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } else {
          res.status(404).json("currentUser not found");
        }
      } else {
        res.status(404).json("user not dound");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};
//unfollow
const unfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const currentUser = await User.findById(req.body.userId);
        if (currentUser) {
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({
              $pull: { followings: req.params.id },
            });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } else {
          res.status(404).json("currentUser not found");
        }
      } else {
        res.status(404).json("user not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};
//find a user
const findUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the user." });
  }
};
module.exports = {
  updateUser,
  // deleteUser,
  userFromToken,
  getUser,
  getFriends,
  follow,
  unfollow,
  findUser,
};
