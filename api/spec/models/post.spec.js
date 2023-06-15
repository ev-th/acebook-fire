var mongoose = require("mongoose");
const { ObjectId } = require('mongoose').Types;

require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  let user;

  beforeAll(async () => {
    user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });

    await user.save();
  })

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  })

  it("has a message", () => {
    let post = new Post({ newPost: "some message" });
    expect(post.newPost).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({ newPost: "some message", userId: user._id });
    console.log(post);
    post.save((err) => {
      expect(err).toBeNull();
      
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts.slice(-1)[0]).toMatchObject({
          newPost: "some message", 
          userId: user._id
        });
        done();
      });
    });
  });
  
  it("initialises with an empty array of likes", () => {
    let post = new Post({ newPost: "some message", userId: user._id });
    expect(post.likes.toObject()).toEqual([]);
  })
  
  it("can add a new like to the likes array", () => {
    const post = new Post({ newPost: "some message", userId: user._id });
    post.likes.push('1234');
    expect(post.likes.toObject()).toEqual(['1234'])
  });

  it("can update a post with a new 'like'", (done) => {
    const post = new Post({ newPost: "some message", userId: user._id });
    console.log(post);
    post.save((err) => {      
      Post.find((err, posts) => {
        let lastPost = posts.slice(-1)[0];
        expect(lastPost.likes.toObject()).toEqual([]);
        post.likes.push('1234');
        post.save((err) => {      
          Post.find((err, posts) => {
            let lastPost = posts.slice(-1)[0];
            expect(lastPost.likes.toObject()).toEqual(['1234']);
            done();
          });
        });
      });
    });
  });

  it("initialises with an empty array of comments", () => {
    let post = new Post({ newPost: "some message", userId: user._id });
    expect(post.comments.toObject()).toEqual([]);
  })
  
  it("can add a new comment to the comments array", () => {
    const post = new Post({ newPost: "some message", userId: user._id });
    post.comments.push({userId:"34343434", content: "test comment"});
    expect(post.comments.toObject()).toEqual([{userId:"34343434", content: "test comment"}])
  });

  it("can update a post with a new 'comment'", (done) => {
    const post = new Post({ newPost: "some message", userId: user._id });
    console.log(post);
    post.save((err) => {      
      Post.find((err, posts) => {
        let lastPost = posts.slice(-1)[0];
        expect(lastPost.comments.toObject()).toEqual([]);
        post.comments.push({userId:"34343434", content: "test comment"});
        post.save((err) => {      
          Post.find((err, posts) => {
            let lastPost = posts.slice(-1)[0];
            expect(lastPost.comments.toObject()).toEqual([{userId:"34343434", content: "test comment"}]);
            done();
          });
        });
      });
    });
  });
});
