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

  it("has a message", () => {
    let post = new Post({ content: "some message" });
    expect(post.content).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      firstName: "John",
      lastName: "Smith",
      userName: "js93",
    });

    const post = new Post({ content: "some message", userId: user._id });
    console.log(post);
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts.slice(-1)[0]).toMatchObject({
          content: "some message", 
          userId: user._id
        });
        done();
      });
    });
  });
});
