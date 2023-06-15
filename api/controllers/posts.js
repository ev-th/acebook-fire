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
    const postId = req.body.postId;
    const like = req.body.like;

    // Post.findById(postId).then( async (post) => {
    //   if (!post) {
    //     res.status(401).json({ message: "auth error" });
    //   } else {

    //     post.likes.push(like);
    //     await post.save();
    //     const token = await TokenGenerator.jsonwebtoken(req.user_id)
    //     res.status(201).json({ message: "OK", token: token});
    //   }
    // });

    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }

      post.likes.push(like);
      post.save(async (err) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: "OK", token: token});
      });
    })
  }
};

module.exports = PostsController;
