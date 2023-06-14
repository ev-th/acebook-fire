const mongoose = require("mongoose");
const User = require("./user");


const PostSchema = new mongoose.Schema({
  content: { type: String, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
