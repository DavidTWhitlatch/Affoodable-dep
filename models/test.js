const db = require('../config/connection');

function save(recipe) {
  return db.any('SELECT name FROM ingredients WHERE name = $/ingredient/', recipe)
    .then(data => console.log(data));
}

save({ ingredient: 'tomato' });
