const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./auth');
const moviesRouter = require('./movies');
const seriesRouter = require('./series');

app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/series', seriesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
