/*
Exercises 4.13.-4.14.
4.13 Blog list expansions, step1
4.14 Blog list expansions, step2

Exercises 4.15.-4.23.
4.15: bloglist expansion, step3
4.16*: bloglist expansion, step4
4.17: bloglist expansion, step5
4.18: bloglist expansion, step6
4.19: bloglist expansion, step7
4.20*: bloglist expansion, step8
4.21*: bloglist expansion, step9
4.22*: bloglist expansion, step10
4.23*: bloglist expansion, step11

*/

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) res.json(blog);
  else res.status(404).end();
});

blogsRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const blog = req.body;
  const { user } = req;
  blog.user = user._id;
  const blogToSave = new Blog(blog);

  const savedBlog = await blogToSave.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

blogsRouter.delete("/:id", tokenExtractor, userExtractor, async (req, res) => {
  const { user } = req;
  if (user) {
    const blogToRemove = await Blog.findById(req.params.id);

    if (user.id.toString() === blogToRemove.user.toString()) {
      const result = await Blog.findByIdAndRemove(req.params.id);
      console.log(result);
      res.status(204).end();
    } else {
      return res.status(401).json({ error: "unauthorised" });
    }
  }
});

module.exports = blogsRouter;
