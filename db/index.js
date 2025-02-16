// Import the pg (node-postgres) library
import pg from 'pg';

// Retrieve the database connection string from environment variables
const connectionString = process.env.DB_URL ||
    'postgresql://blog_o39e_user:6FNAKJtVEv5uI5hfj9kI08f4nit3pXMH@dpg-cup2m43qf0us7397c3ag-a.oregon-postgres.render.com/blog_o39e';

// Check if connection string is defined
if (!connectionString) {
    throw new Error('No DB_URL defined');
}

// Export a new instance of pg.Pool, which will be used to interact with the PostgreSQL database
export const pool = new pg.Pool({
    // Pass the connection string to the pool, so it knows how to connect to your database
    connectionString,
    ssl: {
        rejectUnauthorized: false, // SSL reject false
    },
});
