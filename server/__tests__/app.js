const request = require('supertest');
const { app } = require('../app');

describe('Server App', () => {

  it('should serve successfully a homepage', async() => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});
