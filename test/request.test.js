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
        const date = '2024-11-25'; // one blog with this date
        const response = await request.get(`/api/db/blogs?date=${date}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveLength(1);
        expect(response.body.payload[0].date).toContain(date);
    });
    
    // GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date
    test('GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date', async () => {
        const date = '2024-11-27'; // two blogs with this date
        const response = await request.get(`/api/db/blogs?date=${date}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveLength(2);
        expect(response.body.payload[1].date).toContain(date);
    });
    
    // GET /api/db/blogs?date=YYYY-MM-DD should return no blogs by date
    test('GET /api/db/blogs?date=YYYY-MM-DD should return no blogs by date', async () => {
        const date = '2024-11-24'; // no blogs with this date
        const response = await request.get(`/api/db/blogs?date=${date}`);
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toContain('No blogs found');
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
    
    // GET /api/db/blogs/:id should return two blog entries
    test('GET /api/db/blogs/:id should return two blog entries', async () => {
        const id = 3;
        const response = await request.get(`/api/db/blogs/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', id);
    });
    
    // GET /api/db/blogs/:id should return no blog
    test('GET /api/db/blogs/:id should return no blog', async () => {
        const id = 8; // no blog with this id
        const response = await request.get(`/api/db/blogs/${id}`);
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toContain('No blog found');
    });
    
    // POST /api/db/blogs should create a new blog
    test('POST /api/db/blogs should create a new blog', async () => {
        const newBlog = {
            date: "2025-01-10",
            text: "I hope this works!",
        };
        const response = await request.post('/api/db/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', 8);
        expect(response.body.payload.date).toContain(newBlog.date);
        expect(response.body.payload).toHaveProperty('text', newBlog.text);
    });
    
    // POST /api/db/blogs should create a new blog with "empty" text
    test('POST /api/db/blogs should create a new blog with "empty" text', async () => {
        const newBlog = {
            date: "2025-01-10",
        };
        const response = await request.post('/api/db/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', 9);
        expect(response.body.payload.date).toContain(newBlog.date);
        expect(response.body.payload).toHaveProperty('text', 'empty');
    });
    
    // POST /api/db/blogs should create a new blog for today
    test('POST /api/db/blogs should create a new blog for today', async () => {
        const newBlog = {
            text: "I hope this works!",
        };
        const today = new Date().toISOString().split(/[T ]/i, 1)[0];
        const response = await request.post('/api/db/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', 10);
        expect(response.body.payload.date).toContain(today);
        expect(response.body.payload).toMatchObject(newBlog);
    });
    
    // POST /api/db/blogs should create a new blog for today with "empty" text
    test('POST /api/db/blogs should create a new blog for today with "empty" text', async () => {
        const newBlog = {};
        const today = new Date().toISOString().split(/[T ]/i, 1)[0];
        const response = await request.post('/api/db/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', 11);
        expect(response.body.payload.date).toContain(today);
        expect(response.body.payload.text).toEqual('empty');
    });
    
    // PATCH /api/db/blogs/:id should update a single blog by id
    test('PATCH /api/db/blogs/:id should update a single blog by id', async () => {
        const id = 1;
        const updatedBlog = {
            date: "2025-01-10",
            text: "I hope this works!",
        };
        const response = await request.patch(`/api/db/blogs/${id}`).send(updatedBlog);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.payload).toHaveProperty('id', id);
        expect(response.body.payload.date).toContain(updatedBlog.date);
        expect(response.body.payload.text).toEqual(updatedBlog.text);
    });
    
    // PATCH /api/db/blogs/:id should not find a blog to update
    test('PATCH /api/db/blogs/:id should not find a blog to update', async () => {
        const id = 12; // no blog with this id
        const updatedBlog = {
            date: "2025-01-10",
            text: "I hope this works!",
        };
        const response = await request.patch(`/api/db/blogs/${id}`).send(updatedBlog);
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toContain('No blog found');
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
    
    // DELETE /api/db/blogs/:id should not find a blog to delete
    test('DELETE /api/db/blogs/:id should not find a blog to delete', async () => {
        const id = 12; // no blog with this id
        const response = await request.delete(`/api/db/blogs/${id}`);
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toContain('No blog found');
    });

// End of group
});
