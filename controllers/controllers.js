import { v4 as uuidv4 } from "uuid";
import { readBlogs, writeBlogs } from "../models/blog.js";

// Get all blogs
export async function getBlogs() {
  try {
    const blogs = await readBlogs();
    return blogs;
  } catch (error) {
    throw new Error("Could not get recipes");
  }
}

// Get blog by ID
export async function getBlogByID(id) {
  try {
    const blogs = await readBlogs();
    const blog = blogs.find((blog) => blog.id === id);
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }
    return blog;
  } catch (error) {
    throw new Error(`Could not get recipe with ID ${id}`);
  }
}

// Create blog
export async function createBlog(date, text = "empty") {
  try {
    const newBlog = {
      id: uuidv4(),
      date,
      text,
    };  
    const blogs = await readBlogs();
    blogs.push(newBlog);
    await writeBlogs(blogs);
    return newBlog;
  } catch (error) {
    throw new Error("Could not create blog");
  }
}  

// Update blog by ID
export async function updateBlogByID(id, newDate, newText) {
  try {
    const blogs = await readBlogs();
    const blog = blogs.find((blog) => blog.id === id);
    if (blog) {
      blog.date = newDate ?? blog.date;
      blog.text = newText ?? blog.text;
    }
    await writeBlogs(blogs);
    return blog;
  } catch (error) {
    throw new Error(`Could not update blog with ID ${id}`);
  }
}

// Delete blog by ID
export async function deleteBlogByID(id) {
  try {
    const blogs = await readBlogs();
    const index = blogs.findIndex((blog) => blog.id === id);
    console.log(index);
    if (index === -1) {
      throw new Error(`Blog with ID ${id} not found`);
    }
    const [deletedBlog] = blogs.splice(index, 1);
    await writeBlogs(blogs);
    return deletedBlog;
  } catch (error) {
    throw new Error(`Could not delete blog with ID ${id}`);
  }
}
