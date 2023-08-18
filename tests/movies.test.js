const request = require('supertest');
const app = require('../app');
const { createUser, users } = require('../users');

describe('Movies', () => {
  let token;

  beforeAll(async () => {
    // Simula um usuário autenticado
    createUser('demetriu@gmail.com', '12345');
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'demetriu@gmail.com', password: '12345' });

    token = response.body.token;
  });

  it('should add a new movie', async () => {
    const newMovie = { title: 'New Movie', year: 2023 };
    const response = await request(app).post('/movies').send(newMovie);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newMovie.title);
    expect(response.body.year).toBe(newMovie.year);
  });

  it('should update a movie', async () => {
    const updatedMovie = { title: 'Updated Movie', year: 2024 };
    const response = await request(app).put('/movies/0').send(updatedMovie);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedMovie.title);
    expect(response.body.year).toBe(updatedMovie.year);
  });

  it('should delete a movie', async () => {
    const response = await request(app).delete('/movies/0');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Movie'); // Assuming the movie was updated previously
  });

  it('should return 404 for non-existent movie', async () => {
    const response = await request(app).get('/movies/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Movie not found');
  });

  it('should fail to update a non-existent movie', async () => {
    const updatedMovie = { title: 'Updated Movie', year: 2024 };
    const response = await request(app).put('/movies/999').send(updatedMovie);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Movie not found');
  });

  it('should fail to delete a non-existent movie', async () => {
    const response = await request(app).delete('/movies/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Movie not found');
  });

  it('should return 404 for non-existent movie in GET request', async () => {
    const response = await request(app).get('/movies/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Movie not found');
  });

  //funcionalidades novas de rating e comments
  it('should add a comment to a movie', async () => {
    const response = await request(app)
      .post('/movies/1/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({ comment: 'Great movie!' });

    expect(response.status).toBe(200);
    expect(comments.length).toBe(1);
  });

  it('should add a rating to a movie', async () => {
    const response = await request(app)
      .post('/movies/1/rate')
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 4 });

    expect(response.status).toBe(200);
    expect(ratings['123'].length).toBe(1);
  });

  it('should add a movie to favorites', async () => {
    const response = await request(app)
      .post('/movies/1/favorite')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(favorites['demetriu@gmail.com'].length).toBe(1);
  });

});