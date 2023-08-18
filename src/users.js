const bcrypt = require('bcrypt');

const users = [];

const createUser = (email, password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  users.push({ email, password: hashedPassword });
};

module.exports = {
  users,
  createUser,
};