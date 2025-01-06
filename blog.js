import { v4 as uuidv4 } from "uuid";

// check if works/needed
import { promises as fs } from "node:fs";

const FILEPATH = "./blogs.json";

async function readBlogs() {
  try {
    const data = await fs.readFile(FILEPATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

async function writeBlogs(data) {
  try {
    await fs.writeFile(FILEPATH, JSON.stringify(data), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    return false;
  }
}

export async function getBlogs() {
  const blogs = await readBlogs();
  return blogs;
}

export async function addBlog(date, text = "empty") {
  const newBlog = {
    id: uuidv4(),
    date,
    text,
  };

  const blogs = await readBlogs();

  blogs.push(newBlog);
  await writeBlogs(blogs);

  return newBlog;
}

export async function getBlogByID(id) {
  const blogs = await readBlogs();

  const blog = blogs.find((blog) => blog.id === id);

  return blog;
}

export async function editBlog(id, newDate, newText) {
  const blogs = await readBlogs();

  const blog = blogs.find((blog) => blog.id === id);

  if (blog) {
    blog.date = newDate ?? blog.date;
    blog.text = newText ?? blog.text;
  }

  await writeBlogs(blogs);

  return blog;
}

export async function deleteBlog(id) {
  const blogs = await readBlogs();

  const index = blogs.findIndex((blog) => blog.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedBlog] = blogs.splice(index, 1);
  await writeBlogs(blogs);
  return deletedBlog;
}
