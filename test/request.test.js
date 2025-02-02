import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import { resetDatabase, closePool } from '../db/scripts/reset-database.helpers.js';
// import API requests for testing
import app from '../app.js';

// Create a request object
const request = supertest(app);

// Reset the database before running tests
beforeAll(async () => await resetDatabase());

// Reset the database after running tests
afterAll(async () => {
    await resetDatabase();
    await closePool();
});

// Group tests as HTTP requests (db)
describe('HTTP requests (db)', () => {

    // GET /api/welcome should return a welcome message
    test('GET /api/welcome should return a welcome message', async () => {
        const response = await request.get(`/api/welcome`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome');
        // expect(response.text).toBe('Welcome to the blog API! Please use "./api/db/blogs/" path!');
    });
    
    // GET /api/db/blogs should return all blogs
    test('GET /api/db/blogs should return all blogs', async () => {
        const response = await request.get(`/api/db/blogs`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        // Check rows are returned
        expect(response.body.payload.length).toBeGreaterThan(0);
    });
    
    // GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date
    test('GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date', async () => {
        const date = '2024-11-25';
        const response = await request.get(`/api/db/blogs?date=${date}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload[0].date).toContain(date);
    });
    
    // GET /api/db/blogs/:id should return a single blog
    test('GET /api/db/blogs/:id should return a single blog', async () => {
        const id = 1;
        const response = await request.get(`/api/db/blogs/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', id);
    });
    
    // POST /api/db/blogs should create a new blog
    test('POST /api/db/blogs should create a new blog', async () => {
        const newBlog = {
            date: "2025-01-10T00:00:00.000Z",
            text: "I hope this works!",
        };
        const response = await request.post('/api/db/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.payload).toHaveProperty('id');
        expect(response.body.payload).toMatchObject(newBlog); // look into matching short/long date issue
    });
    
    // PATCH /api/db/blogs/:id should update a single blog by id
    test('PATCH /api/db/blogs/:id should update a single blog by id', async () => {
        const id = 1;
        const updatedBlog = {
            date: "2025-01-10T00:00:00.000Z",
            text: "I hope this works!",
        };
        const response = await request.patch(`/api/db/blogs/${id}`).send(updatedBlog);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.payload).toHaveProperty('id', id);
        expect(response.body.payload).toMatchObject(updatedBlog); // look into matching short/long date issue
    });
    
    // DELETE /api/db/blogs/:id should delete a single blog by id
    test('DELETE /api/db/blogs/:id should delete a single blog by id', async () => {
        const id = 1;
        const response = await request.delete(`/api/db/blogs/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', id);
    });

// End of group
});
