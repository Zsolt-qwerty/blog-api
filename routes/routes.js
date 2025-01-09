import express from "express";

import {
  getBlogs,
  getBlogByID,
  createBlog,
  updateBlogByID,
  deleteBlogByID,
} from "../controllers/controllers.js";

const router = express.Router();

// GET /api/blogs
router.get("/", async function (req, res) {
  try {
    const blogs = await getBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/blogs/:id
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const blog = await getBlogByID(+id);
    if (!blog) {
      res.status(404).send("Quote not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// POST /api/blogs
router.post("/", async function (req, res) {
  try {
    const { date, text } = req.body;
    const blog = await createBlog(date, text);
    res.status(201).json(blog);
  } catch (error) {
    if (error.message === "Invalid recipe data.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// PATCH /api/blogs/:id
router.patch("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { date, text } = req.body;
    const blog = await updateBlogByID(+id, date, text);
    res.status(200).json(blog);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// DELETE /api/blogs/:id
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const deletedBlog = await deleteBlogByID(+id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
