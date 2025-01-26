// Database source
// Import pool
import { pool } from "../db/index.js";

// Get all blogs
export async function fetchAllBlogs() {
  try {
    const query = `SELECT * FROM blogs ORDER BY id;`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error!", error);
  }
}

// Get blogs by date
export async function fetchBlogsByDate(date) {
  try {
    const query = `SELECT * FROM blogs WHERE date=$1 ORDER BY id;`;
    const values = [date];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error!", error);
  }
}

// Get blog by ID
export async function fetchBlogByID(id) {
  try {
    const query = `SELECT * FROM blogs WHERE id=$1;`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error!", error);
  }
}

// Create blog
export async function insertBlog(date = new Date().toJSON().slice(0, 10), text = "empty") {
  try {
    const query = `INSERT INTO blogs (date, text) VALUES ($1, $2) RETURNING *;`;
    const values = [date, text];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error!", error);
  }
}

// -
// Update blog by ID
export async function modifyBlogByID(id, newDate, newText) {
  try {
    const query = `UPDATE blogs SET date=$2, text=$3 WHERE id=$1 RETURNING *;`;
    const values = [id, newDate, newText];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error!", error);
  }
}

// Delete blog by ID
export async function removeBlogByID(id) {
  try {
    const query = `DELETE FROM blogs WHERE id=$1 RETURNING *;`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error!", error);
  }
}
