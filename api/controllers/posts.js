const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          userName: { $arrayElemAt: ['$user.userName', 0] },
          firstName: { $arrayElemAt: ['$user.firstName', 0] },
          lastName: { $arrayElemAt: ['$user.lastName', 0] }
        }
      },
      {
        $project: {
          user: 0
        }
      }
    ], async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Update: (req, res) => {
    console.log('test');
    const postId = req.body.postId;
    const like = req.body.like;
    const comment = req.body.comment;

    Post.findById(postId, (err, post) => {
      if (err) {
        
        throw err;
      }

      if (like) {
        post.likes.includes(like) ?  post.likes.pull(like) : post.likes.push(like);
      }
      
      if (comment) {
        post.comments.push(comment);
      }

      post.save(async (err) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: "OK", token: token, post: post });
      });
    })
  }
};

module.exports = PostsController;
