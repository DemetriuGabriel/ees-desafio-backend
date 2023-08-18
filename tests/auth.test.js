const request = require('supertest');
const app = require('../src/app');
const { createUser, users } = require('../src/users');

describe('Authentication', () => {
  beforeEach(() => {
    users.length = 0;
    createUser('demetriu@gmail.com', '12345');
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'demetriu@gmail.com', password: '12345' });
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'dasdsd@example.com', password: 'fdfd' });
      
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

});