const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UserController = {
  Index: (req, res) => {
    const userName = req.query.username;
    const _id = req.query._id;

    let userDetails = {};

    const searchKey = userName ? "userName" : "_id";
    const searchValue = userName || _id;

    userDetails[searchKey] = searchValue;

    User.findOne(userDetails).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id);
        const foundUser = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          imageUrl: user.imageUrl,
        };
        res.status(200).json({ user: foundUser, token: token });
      }
    });
  },

  UpdateImageUrl: async (req, res) => {
    const userId = req.body.userId;
    const imageUrl = req.body.imageUrl;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { imageUrl: imageUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = await TokenGenerator.jsonwebtoken(updatedUser.id);
      res.status(200).json({ message: "User updated", token });
    } catch (error) {
      console.log("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  },
};

module.exports = UserController;
