// Database source
// Import models
import {
  fetchAllBlogs,
  fetchBlogByID,
  fetchBlogsByDate,
  insertBlog,
  modifyBlogByID,
  removeBlogByID,
} from "../models/remote.models.js";

// Get all blogs + filter by date
export async function getBlogs(req, res) {
  const { date } = req.query;
  const blogs = date
    ? await fetchBlogsByDate(date)
    : await fetchAllBlogs();

  if (blogs.length === 0) {
    return res.status(404).json({
      success: false,
      message: date
        ? `No blogs found with date ${date}`
        : `No blogs found`,
    });
  }

  res.status(200).json({
    success: true,
    payload: blogs,
  });
}

// Get blog by ID
export async function getBlogByID(req, res) {
  const { id } = req.params;
  const blog = await fetchBlogByID(id);
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: `No blog found with ID ${id}`,
    });
  }
  
  res.status(200).json({
    success: true,
    payload: blog,
  });
}

// Create blog
export async function createBlog(req, res) {
  const { date, text } = req.body;
  // if (!text) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Blog text cannot be empty",
  //   });
  // }
  const newBlog = await insertBlog(date, text);
  
  res.status(201).json({
    success: true,
    payload: newBlog,
  });
}

// --- needs reviewed ---
// Update blog by ID
export async function updateBlogByID(req, res) {
  const { id } = req.params;
  const { date, text } = req.body;
  if (!date || !text) {
    return res.status(400).json({
      success: false,
      message: "Date and text are required",
    });
  }
  const updatedBlog = await modifyBlogByID(id, date, text);
  if (!updatedBlog) {
    return res.status(404).json({
      success: false,
      message: `No blog found with ID ${id}`,
    });
  }
  
  res.status(200).json({
    success: true,
    payload: updatedBlog,
  });
}

// Delete blog by ID
export async function deleteBlogByID(req, res) {
  const { id } = req.params;
  const deletedBlog = await removeBlogByID(id);

  if (!deletedBlog) {
    return res.status(404).json({
      success: false,
      message: `No blog found with ID ${id}`,
    });
  }

  // console.log(`Blog with ID ${id} successfully deleted`);
  res.status(200).json({
    success: true,
    payload: deletedBlog,
  });
}
