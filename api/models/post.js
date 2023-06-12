const mongoose = require("mongoose");
const User = require("./user");


const PostSchema = new mongoose.Schema({
  newPost: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
