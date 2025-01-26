// Database source
// Import express
import { Router } from "express";

// Import controllers
import {
  getBlogs,
  getBlogByID,
  createBlog,
  updateBlogByID,
  deleteBlogByID,
} from "../controllers/remote.controllers.js";

// Import validators
// import { validateBlog, validateBlogID } from "./users.validation.js"; // Assuming you have validation functions

const router = Router();

// GET /api/db/blogs + ?date=YYYY-MM-DD
router.get("/", async (req, res, next) => {
  try {
    await getBlogs(req, res);
  } catch (error) {
    next(error);
  }
});

// GET /api/db/blogs/:id
router.get("/:id",/* validateBlogID,*/ async (req, res, next) => {
  try {
    await getBlogByID(req, res);
  } catch (error) {
    next(error);
  }
});

// POST /api/db/blogs
router.post("/",/* validateBlog,*/ async (req, res, next) => {
  try {
    await createBlog(req, res);
  } catch (error) {
    next(error);
  }
});

// --- needs reviewed ---
// PATCH /api/db/blogs/:id
router.patch("/:id", async (req, res, next) => {
  try {
    // const blog = 
    await updateBlogByID(req, res);
    // res.status(200).json(blog);
  } catch (error) {
    // if (error.message.includes("not found")) {
    //   res.status(404).json({ message: error.message });
    // } else {
    //   res.status(500).json({ message: error.message });
      next(error);
    // }
  }
});

// DELETE /api/db/blogs/:id
router.delete("/:id",/* validateBlogID,*/ async (req, res, next) => {
  try {
    await deleteBlogByID(req, res);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

export default router;
