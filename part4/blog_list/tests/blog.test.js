/*
Exercises 4.8.-4.12.
4.8: Blog list tests, step1
4.9: Blog list tests, step2
4.10: Blog list tests, step3
4.11*: Blog list tests, step4
4.12*: Blog list tests, step5
*/

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");
const listHelper = require("../utils/list_helper");

const {
  listWithMultipleBlogs,
  listWithOneBlog,
  getBlogs,
} = require("./test_helper");
let token = "";
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listWithMultipleBlogs);
}, 100000);

describe("application returns the correct amount of blog posts in the JSON format", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("application returns the correct amount of blog posts", async () => {
    const response = await getBlogs();
    expect(response).toHaveLength(listWithMultipleBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await getBlogs();
    expect(response[0].id).toBeDefined();
  });

  test("a specific blog can be viewed", async () => {
    const blogs = await getBlogs();
    const resBlog = await api
      .get(`/api/blogs/${blogs[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(resBlog.body).toEqual(blogs[0]);
  });
});

describe("creation of blog posts", () => {
  test("a valid blog can be created", async () => {
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "ajay", name: "ajay", passwordHash });

    await user.save();

    const loginResponse = await api
      .post("/api/login")
      .send({ username: "ajay", password: "sekret" });

    token = loginResponse.body.token;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(listWithOneBlog[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        author: listWithOneBlog[0].author,
        likes: listWithOneBlog[0].likes,
        title: listWithOneBlog[0].title,
        url: listWithOneBlog[0].url,
      })
    );
    const res = await getBlogs();
    expect(res).toHaveLength(listWithMultipleBlogs.length + 1);
  });
  test("adding a blog fails with status code 400 Bad Request if a token is not provided", async () => {
    await api
      .post("/api/blogs")
      // .set("Authorization", `Bearer ${token}`)
      .send(listWithOneBlog[0])
      .expect(400);

    const res = await getBlogs();
    expect(res).toHaveLength(listWithMultipleBlogs.length);
  });

  test("likes property to be 0 by default", async () => {
    // const loginResponse = await api
    //   .post("/api/login")
    //   .send({ username: "ajay", password: "sekret" });

    // token = loginResponse.body.token;
    const blogWithoutLikes = {
      author: "Ajay Thanki",
      title: "Blog Without Likes",
      url: "http://localhost:3000",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test("blog without title, author or url is not added", async () => {
    // const loginResponse = await api
    //   .post("/api/login")
    //   .send({ username: "ajay", password: "sekret" });

    // token = loginResponse.body.token;
    const emptyBlog = {
      title: "",
      author: "",
      url: "",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(emptyBlog)
      .expect(400);
  });
});
describe("updation of blog post", () => {
  test("a valid blog can be updated", async () => {
    const blogToBeUpdated = await getBlogs();
    const response = await api
      .put(`/api/blogs/${blogToBeUpdated[0].id}`)
      .send(listWithOneBlog[0])
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        author: listWithOneBlog[0].author,
        likes: listWithOneBlog[0].likes,
        title: listWithOneBlog[0].title,
        url: listWithOneBlog[0].url,
      })
    );
  });
});

describe("deleting blog posts", () => {
  test("deleting a single blog post", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    token = loginResponse.body.token;

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(listWithOneBlog[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // console.log(response.body.id);

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const res = await getBlogs();
    expect(res).toHaveLength(listWithMultipleBlogs.length);
  });
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has max liked blogs, equals the object", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
describe("most blogs", () => {
  test("author who has the largest amount of blogs, equals the object", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
describe("most likes", () => {
  test("author who has the largest amount of likes, equals the object", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
