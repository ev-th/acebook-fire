const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/posts", () => {
  beforeAll( async () => {
    user = new User({
      email: "test@test.com",
      password: "12345678",
      firstName: "Test",
      lastName: "Testson",
      userName: "testy"
    });
    await user.save();

    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  afterEach( async () => {
    await Post.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
  })

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ newPost: "hello world", userId: user._id, token: token });
      expect(response.status).toEqual(201);
    });
  
    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({newPost: "hello world", userId: user._id, token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].newPost).toEqual("hello world");
      expect(posts[0].userId).toEqual(user._id);
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({newPost: "hello world", userId: user._id, token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({newPost: "hello world"});
      expect(response.status).toEqual(401);
    });
  
    test("a post is not created", async () => {
      await request(app)
        .post("/posts")
        .send({newPost: "hello world"});
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({newPost: "hello world"});
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({newPost: "howdy!", userId: user._id});
      let post2 = new Post({newPost: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      
      console.log(response.body.posts);
      let messages = response.body.posts.map((post) => ( post.newPost));
      //console.log(messages[]);
      expect(messages).toEqual(["howdy!", "hola!"]);

      let messageId = response.body.posts.map((post) => (post.userId));
      expect(messageId).toEqual([user.id, user.id]);
    })

    test("the response code is 200", async () => {
      let post1 = new Post({message: "howdy!", userId: user._id});
      let post2 = new Post({message: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let post1 = new Post({message: "howdy!", userId: user._id});
      let post2 = new Post({message: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
  })

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({message: "howdy!", userId: user._id});
      let post2 = new Post({message: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.posts).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let post1 = new Post({message: "howdy!", userId: user._id});
      let post2 = new Post({message: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let post1 = new Post({message: "howdy!", userId: user._id});
      let post2 = new Post({message: "hola!", userId: user._id});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.token).toEqual(undefined);
    })
  })

  describe("PATCH, updating with a 'like'", () => {
  let post;

  beforeEach(async ()=>{
    post = new Post({message: "howdy!", userId: user._id});
    await post.save();
  });
  
    test("responds with a 201 when token is present", async () => {
      let response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ postId: post._id, like: "8989898"});
      expect(response.status).toEqual(201);
    });
  
    test("updates a post with a like when token is present", async () => {
      await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({postId: post._id, like: "8989898"});
      let posts = await Post.find();
      expect(posts.slice(-1)[0].likes.toObject()).toEqual(["8989898"]);
    });

    test("updates a post by removing like if already exists when token is present", async () => {
      await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({postId: post._id, like: "8989898"});
      await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({postId: post._id, like: "8989898"});
      let posts = await Post.find();
      expect(posts.slice(-1)[0].likes.toObject()).toEqual([]);
    });
  
    test("returns a new token when token is present", async () => {
      let response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({postId: post._id, like: "123"});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });

    test("doesn't update when token is missing", async () => {
      let response = await request(app)
      .patch("/posts")
      .send({ postId: post._id, like: "8989898"});
      let posts = await Post.find();
      expect(posts.slice(-1)[0].likes.toObject()).toEqual([]);
    })

    test("the response code is 401 when token is missing", async () => {
      let response = await request(app)
      .patch("/posts")
      .send({ postId: post._id, like: "8989898"});
      expect(response.status).toEqual(401);
    })

    test("does not return a new token when token is missing", async () => {
      let response = await request(app)
      .patch("/posts")
      .send({ postId: post._id, like: "8989898"});
      expect(response.body.token).toEqual(undefined);
    })
  });

  describe("PATCH, updating with a 'comment'", () => {
    let post;
  
    beforeEach(async ()=>{
      post = new Post({message: "howdy!", userId: user._id});
      await post.save();
    });
    
      test("responds with a 201 when token is present", async () => {
        let response = await request(app)
          .patch("/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ postId: post._id, comment: {userId: "747483434", content: "what a great post!"}});
        expect(response.status).toEqual(201);
      });
    
      test("updates a post with a comment when token is present", async () => {
        await request(app)
          .patch("/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ postId: post._id, comment: {userId: "747483434", content: "what a great post!"}});
        let posts = await Post.find();
        expect(posts.slice(-1)[0].comments.toObject()[0].userId).toEqual("747483434");
        expect(posts.slice(-1)[0].comments.toObject()[0].content).toEqual("what a great post!");

      });
    });
});
