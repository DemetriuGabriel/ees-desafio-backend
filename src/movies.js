const express = require('express');
const router = express.Router();

const authenticate = require('./auth');

const movies = ['1'];

router.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  if (id < movies.length) {
      res.json(movies[id]);
  } else {
      res.status(404).json({ message: 'Movie not found' });
  }
  });

router.post('/movies', (req, res) => {
  const data = req.body;
  movies.push(data);
  res.status(201).json(data);
});


router.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (movies[id]) {
    movies[id] = data;
    res.json(data);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

router.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  if (movies[id]) {
    const deletedMovie = movies.splice(id, 1)[0];
    res.json(deletedMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

//comments, rating e favorites
const comments = [];

router.post('/movies/:id/comment', authenticate, (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  comments.push({ id, comment });
  res.json({ message: 'Comment added' });
});

const ratings = {};
const favorites = {};

router.post('/movies/:id/rate', authenticate, (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!ratings[id]) {
    ratings[id] = [];
  }
  ratings[id].push({ user: req.user.email, rating });

  res.json({ message: 'Rating added' });
});

router.post('/movies/:id/favorite', authenticate, (req, res) => {
  const { id } = req.params;

  if (!favorites[req.user.email]) {
    favorites[req.user.email] = [];
  }
  if (!favorites[req.user.email].includes(id)) {
    favorites[req.user.email].push(id);
  }

  res.json({ message: 'Added to favorites' });
});

module.exports = router;
