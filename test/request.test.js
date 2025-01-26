import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import { resetBlogsTable } from '../db/scripts/reset-database.js';

// import API requests for testing
import app from '../app.js';

// Create a request object
const request = supertest(app);

// Reset the database before running tests
// beforeAll(async () => await resetBlogsTable());

// Group tests as HTTP requests (db)
describe('HTTP requests (db)', () => {

    // GET /api/welcome should return a welcome message
    test('GET /api/welcome should return a welcome message', async () => {
        const response = await request.get('/api/welcome');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Welcome to the blog API! Please use "./api/db/blogs/" path!');
    });
    
    // GET /api/db/blogs should return all blogs
    test('GET /api/db/blogs should return all blogs', async () => {
        const response = await request.get(`/api/db/blogs`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toEqual(true);
    });
    
    // GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date
    test('GET /api/db/blogs?date=YYYY-MM-DD should return all blogs by date', async () => {
        const date = '2024-11-25';
        const response = await request.get(`/api/db/blogs?date=${date}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.success).toHaveProperty('date', date);
    });
    
    // GET /api/db/blogs/:id should return a single blog
    test('GET /api/db/blogs/:id should return a single blog', async () => {
        const id = 1;
        const response = await request.get(`/api/db/blogs/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.payload).toHaveProperty('id', id);
    });
    
    // // POST /api/db/blogs should create a new blog
    // test('POST /api/db/blogs should create a new blog', async () => {
    //     const newBlog = {
    //         date: "2025-01-10",
    //         text: "I hope this works!",
    //     };
    //     const response = await request.post('/api/db/blogs').send(newBlog);
    //     expect(response.status).toBe(201);
    //     expect(response.headers['content-type']).toMatch(/application\/json/);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body).toMatchObject(newBlog);
    // });
    
    // // PATCH /api/db/blogs/:id should update a single blog by id
    // test('PATCH /api/db/blogs/:id should update a single blog by id', async () => {
    //     const id = 1;
    //     const updatedBlog = {
    //         date: "05/01/2025",
    //         text: "I hope this works!",
    //     };
    //     const response = await request.patch(`/api/db/blogs/${id}`).send(updatedBlog);
    //     expect(response.status).toBe(200);
    //     expect(response.headers['content-type']).toMatch(/application\/json/);
    //     expect(response.body).toHaveProperty('id', id);
    //     expect(response.body).toMatchObject(updatedBlog);
    // });
    
    // // DELETE /api/db/blogs/:id should delete a single blog by id
    // test('DELETE /api/db/blogs/:id should delete a single blog by id', async () => {
    //     const id = 1;
    //     const response = await request.delete(`/api/db/blogs/${id}`);
    //     expect(response.status).toBe(200);
    // });

// Reset the database after running tests
// afterAll(async () => await resetBlogsTable());

// End of group
});
