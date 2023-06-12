var mongoose = require("mongoose");
const { ObjectId } = require('mongoose').Types;


require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");

jest.mock('../../models/user'); // Mocking the User model

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

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
    const mockUser = new User({
      //_id: new ObjectId(),
      _id: new ObjectId("64872986970ff858dba1b795"),
      email: "scarlett@email.com",
      password: "$2b$10$ckiMnkRjw4EzwNXL53PUYevcSPdw38rrRIkFWkbSKKNQc2wpgodfm",
      firstName: "Scarlett",
      lastName: "Scarlettson",
      userName: "scat"
    });
  
    User.findById.mockResolvedValue(mockUser); // Mocking the User.findById method
    
    const post = new Post({ newPost: "some message", user: mockUser._id });
    console.log(post);
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts[-1]).toMatchObject({
         newPost: "some message", 
         user: mockUser._id 
      });
      done();});
    });
  });
});
