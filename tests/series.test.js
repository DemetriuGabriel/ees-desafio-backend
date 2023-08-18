const request = require('supertest');
const app = require('../src/app');
const { createUser, users } = require('../src/users');

describe('Series', () => {
  let token;

  beforeAll(async () => {
    // Simula um usuário autenticado
    createUser('demetriu@gmail.com', '12345');
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'demetriu@gmail.com', password: '12345' });

    token = response.body.token;
  });

  it('should add a new series', async () => {
    const newSeries = {
      title: 'New Series',
      seasons: 3,
      episodes: 24,
    };
    const response = await request(app).post('/series').send(newSeries);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newSeries.title);
    expect(response.body.seasons).toBe(newSeries.seasons);
    expect(response.body.episodes).toBe(newSeries.episodes);
  });

  it('should update a series', async () => {
    const updatedSeries = {
      title: 'Updated Series',
      seasons: 4,
      episodes: 30,
    };
    const response = await request(app).put('/series/0').send(updatedSeries);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedSeries.title);
    expect(response.body.seasons).toBe(updatedSeries.seasons);
    expect(response.body.episodes).toBe(updatedSeries.episodes);
  });

  it('should delete a series', async () => {
    const response = await request(app).delete('/series/0');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Series'); // Assuming the series was updated previously
  });

  it('should return 404 for non-existent series', async () => {
    const response = await request(app).get('/series/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Series not found');
  });

  it('should fail to update a non-existent series', async () => {
    const updatedSeries = {
      title: 'Updated Series',
      seasons: 4,
      episodes: 30,
    };
    const response = await request(app).put('/series/999').send(updatedSeries);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Series not found');
  });

  it('should fail to delete a non-existent series', async () => {
    const response = await request(app).delete('/series/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Series not found');
  });

  it('should return 404 for non-existent series in GET request', async () => {
    const response = await request(app).get('/series/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Series not found');
  });

  //funcionalidades novas como raiting e comments
  it('should add a comment to a series', async () => {
    const response = await request(app)
      .post('/series/supernatural/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({ comment: 'Saving People, hunter things, the familly business!' });

    expect(response.status).toBe(200);
    expect(comments.length).toBe(1);
  });

  it('should add a rating to a series', async () => {
    const response = await request(app)
      .post('/series/supernatural/rate')
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 10 });

    expect(response.status).toBe(200);
    expect(ratings['456'].length).toBe(1);
  });

  it('should add a series to favorites', async () => {
    const response = await request(app)
      .post('/series/supernatural/favorite')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(favorites['demetriu@gmail.com'].length).toBe(1);
  });

});