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
    console.log(`im here!!`)
    console.log(postId)


    Post.findById(postId).then( async (post) => {
      // console.log(`the post: ${post}`)
      if (!post) {
        console.log("auth error: post not found")
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(200).json({ message: "OK", token: token});
      }
    }
      // async (err, post)=>{
      // await post.likes.push(like);
      // await post.save();}
      );



  }
};

module.exports = PostsController;
