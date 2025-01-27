import { pool } from "../index.js";
import { seedData } from "../seed-data.js";

export async function dropBlogsTable() {
  return await pool.query(`DROP TABLE IF EXISTS blogs;`);
}

export async function createBlogsTable() {
  return await pool.query(
    `CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
      date DATE NOT NULL,
      text VARCHAR(255) NOT NULL
    );`
  );
}
        
// --- needs reviewed ---
export async function populateBlogsTable(data) {
  return await pool.query(
    `INSERT INTO blogs (
      date, text
    ) (
      SELECT date, text
      FROM json_populate_recordset(NULL::blogs, $1::JSON)
    )
    RETURNING *;`,
    [JSON.stringify(data)]
  );
}

export async function resetBlogsTable(data = seedData) {
  await dropBlogsTable();
  await createBlogsTable();
  const response = await populateBlogsTable(data);
  return response.rows;
}

export async function resetDatabase() {
  try {
    const insertedRows = await resetBlogsTable(seedData);
    console.log("Dropped, re-created and re-seeded 'blogs' table");
    // console.log(insertedRows);
  } catch (err) {
    console.error(err);
  // } finally {
  //  await pool.end();
  }
}

export async function closePool() {
  await pool.end();
}
