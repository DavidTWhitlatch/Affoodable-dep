const db = require('../config/connection');


const findByUsername = (username) => {
  debugger;
  const queryPromise = db.one(`
        SELECT * 
        FROM users
        WHERE name = $1
        `, username);
  return queryPromise;
};

const createUser = (user) => {
  debugger;
  const queryPromise = db.one(`
    INSERT INTO users ( name, password_digest )
    VALUES ($/name/, $/password_digest/)
    RETURNING *
    `, user);
  return queryPromise;
};

module.exports = {
  findByUsername,
  createUser,
};
