import { test, expect, describe } from 'vitest';
import supertest from 'supertest';

// import API requests for testing
import app from '../app.js';

// Create a request object
const request = supertest(app);

// Group tests as HTTP requests
describe('HTTP requests', () => {

    // GET /blogs should return a welcome message
    test('GET /blogs should return a welcome message', async () => {
        const response = await request.get('/blogs');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Welcome to the blog API! Please use "./api/blogs/" path!');
    });
    
    // GET /api/blogs should return all blogs
    test('GET /api/blogs should return all blogs', async () => {
        const response = await request.get('/api/blogs');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });
    
    // GET /api/blogs/:id should return a single blog
    test('GET /api/blogs/:id should return a single blog', async () => {
        const id = 1;
        const response = await request.get(`/api/blogs/${id}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveProperty('id', id);
    });
    
    // POST /api/blogs should create a new blog
    test('POST /api/blogs should create a new blog', async () => {
        const newBlog = {
            date: "05/01/2025",
            text: "I hope this works!",
        };
        const response = await request.post('/api/blogs').send(newBlog);
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(newBlog);
    });
    
    // PATCH /api/blogs/:id should update a single blog by id
    test('PATCH /api/blogs/:id should update a single blog by id', async () => {
        const id = 1;
        const updatedBlog = {
            date: "05/01/2025",
            text: "I hope this works!",
        };
        const response = await request.patch(`/api/blogs/${id}`).send(updatedBlog);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveProperty('id', id);
        expect(response.body).toMatchObject(updatedBlog);
    });
    
    // DELETE /api/blogs/:id should delete a single blog by id
    test('DELETE /api/blogs/:id should delete a single blog by id', async () => {
        const id = 1;
        const response = await request.delete(`/api/blogs/${id}`);
        expect(response.status).toBe(200);
    });
 
// End of group
});
