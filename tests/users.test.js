const request = require('supertest');
const app = require('../src/app');
const { users, createUser } = require('../src/users');

describe('Users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'demetriu2@gmail.com', password: '123456' });

    expect(response.status).toBe(201);
    expect(users.length).toBe(1);
  });

  // Outros testes de autenticação de usuários, como login e logout
});