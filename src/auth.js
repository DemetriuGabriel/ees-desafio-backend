const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const secretKey = 'your-secret-key';

const users = [];

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, secretKey);
  res.json({ token });
});

// Outras rotas de autenticação, como registro, logout, etc.

module.exports = router;