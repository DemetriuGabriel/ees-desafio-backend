const express = require('express');
const router = express.Router();

const authenticate = require('./authMiddleware');

router.get('/series/:id', (req, res) => {
  const { id } = req.params;
  if (id < series.length) {
      res.json(series[id]);
  } else {
      res.status(404).json({ message: 'Series not found' });
  }
});

router.post('/series', (req, res) => {
  const data = req.body;
  series.push(data);
  res.status(201).json(data);
});

router.put('/series/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (series[id]) {
    series[id] = data;
    res.json(data);
  } else {
    res.status(404).json({ message: 'Series not found' });
  }
});

router.delete('/series/:id', (req, res) => {
  const { id } = req.params;
  if (series[id]) {
    const deletedSeries = series.splice(id, 1)[0];
    res.json(deletedSeries);
  } else {
    res.status(404).json({ message: 'Series not found' });
  }
});

//comments, rating e favorites
const comments = [];

router.post('/series/:id/comment', authenticate, (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  comments.push({ id, comment });
  res.json({ message: 'Comment added' });
});

const ratings = {};
const favorites = {};

router.post('/series/:id/rate', authenticate, (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!ratings[id]) {
    ratings[id] = [];
  }
  ratings[id].push({ user: req.user.email, rating });

  res.json({ message: 'Rating added' });
});

router.post('/series/:id/favorite', authenticate, (req, res) => {
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