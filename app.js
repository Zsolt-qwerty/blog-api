import express from "express";
const app = express();
const PORT = 3000;

import {
  getBlogs,
  getBlogByID,
  addBlog,
  editBlog,
  deleteBlog,
} from "./blog.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the blog API");
});

app.get("/blogs", async function (req, res) {
  const blogs = await getBlogs();
  res.json(blogs);
});

app.get("/blogs/:id", async function (req, res) {
  const { id } = req.params;
  const blog = await getBlogByID(+id);
  if (!blog) {
    res.status(404).send("Quote not found");
  }
  res.json(blog);
});

app.post("/blogs", async function (req, res) {
  const { date, text } = req.body;
  const blog = await addBlog(date, text);
  res.status(201).json(blog);
});

app.patch("/blogs/:id", async function (req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const blog = await editBlog(+id, text);
  res.json(blog);
});

app.delete("/blogs/:id", async function (req, res) {
  const { id } = req.params;
  const blog = await deleteBlog(+id);
  res.json(blog);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
