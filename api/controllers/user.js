const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UserController = {
    Index: (req, res) => {
        const email = req.body.email;

        User.findOne({ email: email }).then(async (user) => {
            if (!user) {
              console.log("auth error: user not found")
              res.status(401).json({ message: "auth error" });
            } else {
              const token = await TokenGenerator.jsonwebtoken(user.id)
              const foundUser = {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName
              }
              res.status(200).json({ user: foundUser, token: token});
            }
          });
    }
};

module.exports = UserController;